const express = require('express');
const db = require('../config/db');
const sendEmail = require('../routes/mailer');  // Import the sendEmail function
const router = express.Router();

// Route to notify parents of absenteeism
router.get("/notify-absentees", (req, res) => {
    const query = `
        SELECT students.name, students.email, attendance.attendance_date
        FROM attendance
        JOIN students ON attendance.student_id = students.student_id
        WHERE attendance.status = 'Absent'
        
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching absentee records:", err);
            return res.status(500).send("Database error");
        }

        let recipientEmails = [];  // Array to store emails of parents

        results.forEach(record => {
            if (record.email) {
                recipientEmails.push(record.email);  // Store valid parent emails
                
                const message = `Dear Parent, your child ${record.name} was absent on ${record.attendance_date}. Please follow up with your child.`;
                sendEmail(record.email, "Absentee Notification", message); // Send email to parents
            }
        });

        res.render("absent", { email: recipientEmails,
             subject: "Absenteeism Notification",
             attendance_date: results[0]?.attendance_date || "" });
    });
});

module.exports = router;
