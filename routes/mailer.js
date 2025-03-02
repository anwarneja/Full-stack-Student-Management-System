const nodemailer = require("nodemailer");

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use any email service you prefer
    auth: {
        user: process.env.EMAIL_USER,  // Add your email
        pass: process.env.EMAIL_PASS,  // Add your email password
    }
});



// Function to send email
const sendEmail = (to, subject, text) => {
    console.log(`Sending email to: ${to}`);

    const mailOptions = {
        from: process.env.EMAIL_USER,  // From your email
        to:to,                       // Receiver's email (could be the student's email)
        subject: subject,             // Email subject
        text: text,                   // Email body content
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
