import jwt from 'jsonwebtoken';
import appConfig from '../config/appConfig.js'; // <-- Import config

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Akses Ditolak! Kamu belum login." });

    // Gunakan secret dari config, BUKAN tulisan manual
    jwt.verify(token, appConfig.jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Tidak Valid!" });
        req.user = user;
        next();
    });
};