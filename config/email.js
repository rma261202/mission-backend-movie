import nodemailer from 'nodemailer';
import appConfig from './appConfig.js'; // <-- Import config baru

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: appConfig.email.user,
        pass: appConfig.email.pass,
    }
});

export const sendVerificationEmail = async (email, token) => {
    // URL dinamis, tidak hardcode localhost lagi
    const verificationLink = `${appConfig.app.baseUrl}/verify-email?token=${token}`;

    const mailOptions = {
        from: appConfig.email.from,
        to: email,
        subject: 'Verifikasi Akun Chill Movie',
        html: `
            <h3>Halo!</h3>
            <p>Terima kasih sudah mendaftar. Silakan klik link di bawah ini:</p>
            <a href="${verificationLink}">Verifikasi Email Saya</a>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email terkirim ke: " + email);
    } catch (error) {
        console.error("Gagal kirim email:", error);
    }
};