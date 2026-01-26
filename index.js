import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database.js';
import movieRoute from './routes/movieRoute.js'; // <--- 1. Import Route

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(movieRoute); // <--- 2. Gunakan Route disini

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