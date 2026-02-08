import { upload } from '../middlewares/uploadMiddleware.js'; // <--- 1. Import ini
import express from 'express';
import { 
    getMovies, 
    getMovieById, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movieController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // <--- 1. Import Satpamnya


const router = express.Router();

// --- PUBLIC ROUTES (Bisa diakses siapa saja) ---
router.get('/movies', getMovies);           
router.get('/movies/:id', getMovieById);
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Tidak ada file yang diupload!" });
        }
        
        // Kembalikan nama file agar bisa disimpan di database nanti
        res.json({ 
            message: "Upload Berhasil!",
            filePath: `/uploads/${req.file.filename}` 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});    

// --- PROTECTED ROUTES (Harus Login / Punya Token) ---
// Kita pasang 'verifyToken' sebelum menjalankan controller
router.post('/movies', verifyToken, createMovie);       
router.patch('/movies/:id', verifyToken, updateMovie);  
router.delete('/movies/:id', verifyToken, deleteMovie); 

export default router;