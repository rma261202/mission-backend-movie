import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';
import movieRoute from './routes/movieRoute.js'; 
import authRoute from './routes/authRoute.js'; // ✅ 1. Sudah di-import (Benar)

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // <--- Folder uploads jadi publik

// DAFTAR ROUTES (PINTU MASUK)
app.use(movieRoute); 
app.use(authRoute); // ❌ <--- Tadi baris ini HILANG. Sekarang sudah ada ✅

// Tes Koneksi saat server nyala
const testConnection = async () => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log("✅ Berhasil terhubung ke MySQL! Hasil tes:", rows[0].result);
    } catch (error) {
        console.error("❌ Gagal konek ke database:", error.message);
    }
};

testConnection();

app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
});