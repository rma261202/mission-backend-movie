import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import appConfig from './config/appConfig.js'; // <-- Import config
import movieRoute from './routes/movieRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
const port = appConfig.app.port; // <-- Pakai config

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// DAFTAR ROUTES
app.use(movieRoute);
app.use(authRoute);

// Tes Koneksi
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