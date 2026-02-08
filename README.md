# 🎬 Chill Movie App - Backend API

![NodeJS](https://img.shields.io/badge/Node.js-18.x-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

---

## 🇮🇩 Dokumentasi (Bahasa Indonesia)

**Chill Movie App** adalah Backend API untuk aplikasi streaming film sederhana. Project ini dibangun menggunakan Node.js, Express, dan database MySQL. API ini menangani autentikasi pengguna, manajemen data film (CRUD), fitur pencarian canggih, dan upload gambar.

### 🚀 Fitur Utama
* **Autentikasi Aman**: Registrasi & Login menggunakan JWT (JSON Web Token) dan Bcrypt untuk hashing password.
* **Manajemen Film (CRUD)**: Create, Read, Update, Delete data film.
* **Query Canggih**: Mendukung pencarian (Search), Filter berdasarkan tahun, dan Sorting (Rating/Terbaru).
* **Upload Gambar**: Upload poster film ke server menggunakan library Multer.
* **Keamanan (Middleware)**: Memproteksi endpoint sensitif (hanya user yang login yang bisa menambah/edit data).

### 🛠️ Teknologi yang Digunakan
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MySQL
* **Auth**: JSON Web Token (JWT)
* **File Upload**: Multer

### ⚙️ Cara Menjalankan Project

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/rma261202/mission-backend-movie.git](https://github.com/rma261202/mission-backend-movie.git)
    cd mission-backend-movie
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Database**
    * Buat database baru di MySQL bernama `chill_movie_db`.
    * Pastikan MySQL berjalan di port default (3306).

4.  **Konfigurasi Environment (.env)**
    Buat file baru bernama `.env` di folder utama (root), lalu isi dengan konfigurasi berikut:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=chill_movie_db
    DB_PORT=3306
    PORT=3000
    JWT_SECRET=rahasia_negara_api
    ```

5.  **Jalankan Server**
    ```bash
    node index.js
    ```
    Server akan berjalan di `http://localhost:3000`

---

## 🇬🇧 Documentation (English)

**Chill Movie App** is a Backend API for a simple movie streaming application. Built with Node.js, Express, and MySQL. This API handles user authentication, movie data management (CRUD), advanced query features, and image uploading.

### 🚀 Key Features
* **Secure Authentication**: Register & Login using JWT (JSON Web Token) and Bcrypt for password hashing.
* **Movie Management (CRUD)**: Create, Read, Update, and Delete movie data.
* **Advanced Query**: Supports Search, Filtering by year, and Sorting (Rating/Newest).
* **Image Upload**: Upload movie posters to the server using the Multer library.
* **Security (Middleware)**: Protects sensitive endpoints (only logged-in users can add/edit data).

### 🛠️ Tech Stack
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MySQL
* **Auth**: JSON Web Token (JWT)
* **File Upload**: Multer

### ⚙️ How to Run the Project

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/rma261202/mission-backend-movie.git](https://github.com/rma261202/mission-backend-movie.git)
    cd mission-backend-movie
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Database**
    * Create a new database in MySQL named `chill_movie_db`.
    * Ensure MySQL is running on the default port (3306).

4.  **Environment Configuration (.env)**
    Create a new file named `.env` in the root folder, and fill it with the following configuration:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=chill_movie_db
    DB_PORT=3306
    PORT=3000
    JWT_SECRET=rahasia_negara_api
    ```

5.  **Run Server**
    ```bash
    node index.js
    ```
    The server will run at `http://localhost:3000`

---
**Created by Rafli Maulana**