import dotenv from 'dotenv';
dotenv.config();

const appConfig = {
    app: {
        port: process.env.PORT || 3000,
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'chill_movie_db',
        port: process.env.DB_PORT || 3306,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'kunci_cadangan_jika_env_hilang',
        expire: process.env.JWT_EXPIRE || '1d',
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM,
    }
};

export default appConfig;