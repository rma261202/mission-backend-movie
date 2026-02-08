import db from '../config/database.js';

// 1. GET ALL Movies (Dengan Fitur Search, Filter, & Sort)
export const getMovies = async (req, res) => {
    try {
        // Ambil parameter dari URL (?search=...&year=...&sortBy=...)
        const { search, year, sortBy } = req.query;

        let query = "SELECT * FROM movies";
        let queryParams = [];
        let conditions = [];

        // --- LOGIKA FILTER & SEARCH ---
        
        // 1. Jika ada 'search', cari judul yang mirip
        if (search) {
            conditions.push("title LIKE ?");
            queryParams.push(`%${search}%`);
        }

        // 2. Jika ada 'year', cari tahun yang sama
        if (year) {
            conditions.push("year = ?");
            queryParams.push(year);
        }

        // Gabungkan kondisi dengan kata "AND" (jika ada filter)
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        // --- LOGIKA SORTING ---
        
        // 3. Urutkan berdasarkan permintaan
        if (sortBy === 'rating') {
            query += " ORDER BY rating DESC"; // Rating tertinggi ke terendah
        } else if (sortBy === 'oldest') {
            query += " ORDER BY year ASC";    // Tahun terlama ke terbaru
        } else {
            query += " ORDER BY id DESC";     // Default: Data terbaru (input terakhir) paling atas
        }

        // Eksekusi query ke database
        const [rows] = await db.query(query, queryParams);
        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

// 2. GET Single Movie by ID
export const getMovieById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Movie not found" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 3. CREATE Movie
export const createMovie = async (req, res) => {
    try {
        const { title, poster, rating, year } = req.body;
        const [result] = await db.query(
            'INSERT INTO movies (title, poster, rating, year) VALUES (?, ?, ?, ?)',
            [title, poster, rating, year]
        );
        res.status(201).json({ id: result.insertId, title, poster, rating, year });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 4. UPDATE Movie
export const updateMovie = async (req, res) => {
    try {
        const { title, poster, rating, year } = req.body;
        await db.query(
            'UPDATE movies SET title = ?, poster = ?, rating = ?, year = ? WHERE id = ?',
            [title, poster, rating, year, req.params.id]
        );
        res.json({ message: "Movie updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 5. DELETE Movie
export const deleteMovie = async (req, res) => {
    try {
        await db.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}