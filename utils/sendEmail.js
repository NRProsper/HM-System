import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export const sendEmail = (receipt, subject, body) => {
    const mailOptions = {
        from: `"CareSync" <${process.env.EMAIL_USER}>`,
        to: receipt,
        subject: subject,
        html: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
