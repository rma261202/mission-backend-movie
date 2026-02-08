import multer from 'multer';
import path from 'path';

// 1. Tentukan tempat penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // File akan disimpan di folder 'uploads'
    },
    filename: (req, file, cb) => {
        // Buat nama file unik (misal: 1789231-poster.jpg) biar gak bentrok
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Filter hanya boleh upload gambar (jpg, png, jpeg)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Hanya boleh upload file gambar!'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Maksimal 5MB
    },
    fileFilter: fileFilter
});
