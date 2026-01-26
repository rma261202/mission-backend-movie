import db from '../config/database.js';

// 1. GET ALL Movies
export const getMovies = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM movies');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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