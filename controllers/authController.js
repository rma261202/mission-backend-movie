import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { sendVerificationEmail } from '../config/email.js'; // Import Kirim Email

// 1. REGISTER (Dimodifikasi)
export const register = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        // Generate Token Unik untuk verifikasi email
        const verificationToken = uuidv4();

        // Simpan User + Token ke Database
        await db.query(
            'INSERT INTO users (fullname, username, email, password, verification_token) VALUES (?, ?, ?, ?, ?)',
            [fullname, username, email, hashPassword, verificationToken]
        );

        // Kirim Email (Asynchronous, biar gak nunggu lama)
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

// 2. LOGIN (Tetap sama)
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: "Email tidak ditemukan" });

        const user = users[0];
        
        // Cek apakah sudah verifikasi? (Opsional, sesuai kebutuhan)
        // if (!user.is_verified) return res.status(401).json({ message: "Email belum diverifikasi!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Password salah!" });

        const userId = user.id;
        const name = user.fullname;
        const userEmail = user.email;

        const accessToken = jwt.sign({ userId, name, email: userEmail }, 'rahasia_negara_api', { expiresIn: '1d' });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// 3. VERIFY EMAIL (Baru)
export const verifyEmail = async (req, res) => {
    const { token } = req.query; // Ambil token dari URL (?token=...)

    try {
        // Cari user yang punya token ini
        const [users] = await db.query('SELECT * FROM users WHERE verification_token = ?', [token]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid Verification Token" });
        }

        // Update user jadi verified dan hapus tokennya
        await db.query('UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?', [users[0].id]);

        res.send("<h1>Email Verified Successfully! ✅</h1><p>Silakan login di aplikasi.</p>");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}