import express from 'express';
import { 
    getMovies, 
    getMovieById, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', getMovies);           // Ambil semua
router.get('/movies/:id', getMovieById);    // Ambil satu by ID
router.post('/movies', createMovie);        // Tambah baru
router.patch('/movies/:id', updateMovie);   // Edit
router.delete('/movies/:id', deleteMovie);  // Hapus

export default router;