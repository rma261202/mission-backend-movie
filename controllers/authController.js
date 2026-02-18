import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '../config/email.js';
import appConfig from '../config/appConfig.js'; // <-- Import config

// 1. REGISTER
export const register = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const verificationToken = uuidv4();

        await db.query(
            'INSERT INTO users (fullname, username, email, password, verification_token) VALUES (?, ?, ?, ?, ?)',
            [fullname, username, email, hashPassword, verificationToken]
        );

        sendVerificationEmail(email, verificationToken);

        res.status(201).json({ 
            message: "Register Berhasil! Silakan cek email untuk verifikasi." 
        });

    } catch (error) {
        console.log(error);
        if(error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email atau Username sudah terdaftar!" });
        }
        res.status(500).json({ message: "Server Error" });
    }
}

// 2. LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: "Email tidak ditemukan" });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Password salah!" });

        const userId = user.id;
        const name = user.fullname;
        const userEmail = user.email;

        // Gunakan secret dari config!
        const accessToken = jwt.sign(
            { userId, name, email: userEmail }, 
            appConfig.jwt.secret, 
            { expiresIn: appConfig.jwt.expire }
        );

        res.json({ accessToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// 3. VERIFY EMAIL
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE verification_token = ?', [token]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid Verification Token" });
        }

        await db.query('UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?', [users[0].id]);
        res.send("<h1>Email Verified Successfully! ✅</h1><p>Silakan login di aplikasi.</p>");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}