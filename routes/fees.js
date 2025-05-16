
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Change to pool
const sendEmail = require("../routes/mailer");

router.get('/fees', (req, res) => {
    if (!req.session.user) return res.redirect('/signup');

    const isAdmin = req.session.user.role === "admin";
    const query = `
        SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.name AS student_name
        FROM fees f
        JOIN students s ON f.student_id = s.student_id
        ORDER BY f.paid_date DESC
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching fee records:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        res.render('fees', { fees: results, isAdmin });
    });
});

router.get('/edit-fee/:id', (req, res) => {
    const feeId = req.params.id;
    const query = `
        SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.student_id, s.name AS student_name
        FROM fees f
        JOIN students s ON f.student_id = s.student_id
        WHERE f.fee_id = ?
    `;

    pool.query(query, [feeId], (err, results) => {
        if (err) {
            console.error('Error fetching fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        if (results.length > 0) {
            const fee = results[0];
            fee.isPaid = fee.status === "Paid";
            fee.isPending = fee.status === "Pending";
            return res.render('edit-fee', { fee });
        }
        return res.status(404).send('Fee record not found');
    });
});

router.post('/update-fee/:id', (req, res) => {
    const feeId = req.params.id;
    const { fee_amount, paid_date, status } = req.body;
    const query = `
        UPDATE fees
        SET fee_amount = ?, paid_date = ?, status = ?
        WHERE fee_id = ?
    `;

    pool.query(query, [fee_amount, paid_date, status, feeId], (err, results) => {
        if (err) {
            console.error('Error updating fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        return res.render('updatefees', { message: 'Student-fee updated successfully!', link: '/fees' });
    });
});

router.get('/add-fee', (req, res) => {
    const query = "SELECT student_id, name FROM students";
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send("Database error: " + err.message);
        }
        return res.render("add-fee", { students: results });
    });
});

router.post('/add-fee', (req, res) => {
    const { student_id, fee_amount, paid_date, status } = req.body;
    const checkQuery = `SELECT * FROM fees WHERE student_id = ? AND paid_date = ?`;

    pool.query(checkQuery, [student_id, paid_date], (err, results) => {
        if (err) {
            console.error('Error checking existing fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        if (results.length > 0) {
            return res.render('errorfee', { message: 'Fee entry already exists for this date!', link: '/fees' });
        }
        const insertQuery = `
            INSERT INTO fees (student_id, fee_amount, paid_date, status) 
            VALUES (?, ?, ?, ?)
        `;
        pool.query(insertQuery, [student_id, fee_amount, paid_date, status], (err, results) => {
            if (err) {
                console.error("Error inserting fee record:", err);
                return res.status(500).send("Database error: " + err.message);
            }
            return res.render('fee-isadded', { message: 'A New Month Student-fee Added Successfully!', link: '/fees' });
        });
    });
});

router.get('/confirm-delete/:id', (req, res) => {
    const feeId = req.params.id;
    const query = `SELECT fee_id, fee_amount, paid_date FROM fees WHERE fee_id = ?`;

    pool.query(query, [feeId], (err, results) => {
        if (err) {
            console.error('Error fetching fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        if (results.length > 0) {
            return res.render('confirm-delete', { fee: results[0] });
        }
        return res.status(404).send('Fee record not found');
    });
});

router.post('/delete-fee/:id', (req, res) => {
    const feeId = req.params.id;
    const deleteQuery = `DELETE FROM fees WHERE fee_id = ?`;

    pool.query(deleteQuery, [feeId], (err, results) => {
        if (err) {
            console.error('Error deleting fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        return res.render('delete-fee', { message: 'Fee Deleted Successfully!', link: '/fees' });
    });
});

router.get('/receipt/:fee_id', (req, res) => {
    const feeId = req.params.fee_id;
    const query = `
        SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.name AS student_name, s.roll_number
        FROM fees f
        JOIN students s ON f.student_id = s.student_id
        WHERE f.fee_id = ?
    `;
    
    pool.query(query, [feeId], (err, results) => {
        if (err) {
            console.error('Error fetching fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        if (results.length > 0) {
            const fee = results[0];
            res.render('fee-receipt', { fee });
        } else {
            res.status(404).send('Fee record not found');
        }
    });
});

router.get("/notify-due-fees/", (req, res) => {
    const query = `
        SELECT students.email, fees.fee_amount, fees.paid_date, students.name
        FROM fees
        JOIN students ON fees.student_id = students.student_id
        WHERE fees.status = 'Pending'
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching due fees:", err);
            return res.status(500).send("Database error: " + err.message);
        }

        let recipientEmails = [];
        results.forEach(fee => {
            if (fee.email) {
                recipientEmails.push(fee.email);
                const message = `Dear Student, your tuition fee of $${fee.fee_amount} is due. Please pay by ${fee.paid_date}.`;
                sendEmail(fee.email, "Fee Payment Due", message);
            }
        });

        res.render("email-sent", { email: recipientEmails, subject: "Payment Reminder" });
    });
});

module.exports = router;








