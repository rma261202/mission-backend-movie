import nodemailer from 'nodemailer';

// GANTI DENGAN EMAIL & APP PASSWORD KAMU
// Cara dapat App Password: Akun Google > Keamanan > Verifikasi 2 Langkah > App Passwords
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'EMAIL_GMAIL_KAMU_DISINI@gmail.com', 
        pass: 'PASSWORD_APP_GOOGLE_KAMU' 
    }
});

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    
    const mailOptions = {
        from: '"Chill Movie Admin" <no-reply@chillmovie.com>',
        to: email,
        subject: 'Verifikasi Akun Chill Movie',
        html: `
            <h3>Halo!</h3>
            <p>Terima kasih sudah mendaftar. Silakan klik link di bawah ini untuk verifikasi akun kamu:</p>
            <a href="${verificationLink}">Verifikasi Email Saya</a>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email verifikasi terkirim ke: " + email);
    } catch (error) {
        console.error("Gagal kirim email:", error);
    }
};