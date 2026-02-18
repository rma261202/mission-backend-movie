import mysql from 'mysql2/promise';
import appConfig from './appConfig.js'; // <-- Import config baru

const db = mysql.createPool({
    host: appConfig.db.host,
    user: appConfig.db.user,
    password: appConfig.db.password,
    database: appConfig.db.name,
    port: appConfig.db.port,
});

export default db;