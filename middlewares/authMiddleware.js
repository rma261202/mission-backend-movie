import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah "Bearer "

    if (token == null) return res.status(401).json({ message: "Akses Ditolak! Kamu belum login." });

    jwt.verify(token, 'rahasia_negara_api', (err, user) => {
        if (err) return res.status(403).json({ message: "Token Tidak Valid!" });
        
        req.user = user;
        next(); // Lanjut ke controller
    });
};