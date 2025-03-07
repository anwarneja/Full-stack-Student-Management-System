// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const sendEmail = require("../routes/mailer"); // Import email function

// // Route to display all fee payments
// router.get('/fees', (req, res) => {
//     if (!req.session.user) return res.redirect('/signup'); // Ensure user is logged in

//     const isAdmin = req.session.user.role === "admin"; // Check if user is admin



//     const query = `
//         SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.name AS student_name
//         FROM Fees f
//         JOIN students s ON f.student_id = s.student_id
//         ORDER BY f.paid_date DESC
//     `;

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching fee records:', err);
//             return res.status(500).send('Internal Server Error');
//         }
//         res.render('fees', { fees: results,isAdmin });
//     });
// });

// // Route to display the edit fee form
// router.get('/edit-fee/:id', (req, res) => {
//     const feeId = req.params.id;

         

//     // Fetch fee details by fee_id
//     const query = `
//         SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.student_id, s.name AS student_name
//         FROM Fees f
//         JOIN students s ON f.student_id = s.student_id
//         WHERE f.fee_id = ?
//     `;

//     db.query(query, [feeId], (err, results) => {
//         if (err) {
//             console.error('Error fetching fee record:', err);
//             return res.status(500).send('Internal Server Error');
//         }
//         if (results.length > 0) {
//             // Set the isPaid and isPending flags before rendering
//             const fee = results[0];
//             fee.isPaid = fee.status === "Paid";
//             fee.isPending = fee.status === "Pending";
//             return res.render('edit-fee', { fee });
//         }
//         return res.status(404).send('Fee record not found');
//     });
// });

// // Route to update the fee record
// router.post('/update-fee/:id', (req, res) => {
//     const feeId = req.params.id;
//     const { fee_amount, paid_date, status } = req.body;

//     const query = `
//         UPDATE Fees
//         SET fee_amount = ?, paid_date = ?, status = ?
//         WHERE fee_id = ?
//     `;

//     db.query(query, [fee_amount, paid_date, status, feeId], (err, results) => {
//         if (err) {
//             console.error('Error updating fee record:', err);
//             return res.status(500).send('Internal Server Error');
//         }
//         return res.render('updatefees', { message: 'Student-fee updated successfully!', link: '/fees' });
//     });
// });

// // Route to render the "Add Fee Payment" page
// router.get('/add-fee', (req, res) => {
//     const query = "SELECT student_id, name FROM students"; // Fetch all students

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching students:", err);
//             return res.status(500).send("Internal Server Error");
//         }
//         return res.render("add-fee", { students: results });
//     });
// });

// // Route to insert new fee payment
// router.post('/add-fee', (req, res) => {
//     const { student_id, fee_amount, paid_date, status } = req.body;

//     // Check if a fee record already exists for this student on the same date
//     const checkQuery = `SELECT * FROM Fees WHERE student_id = ? AND paid_date = ?`;

//     db.query(checkQuery, [student_id, paid_date], (err, results) => {
//         if (err) {
//             console.error('Error checking existing fee record:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         if (results.length > 0) {
//             // If a record already exists, prevent insertion
//             return res.render('errorfee', { message: 'Fee entry already exists for this date!', link: '/fees' });
//         }

//         // If no duplicate exists, proceed with insertion
//         const insertQuery = `
//             INSERT INTO Fees (student_id, fee_amount, paid_date, status) 
//             VALUES (?, ?, ?, ?)
//         `;

//         db.query(insertQuery, [student_id, fee_amount, paid_date, status], (err, results) => {
//             if (err) {
//                 console.error("Error inserting fee record:", err);
//                 return res.status(500).send("Internal Server Error");
//             }
//             return res.render('fee-isadded', { message: 'A New Month Student-fee Added Successfully!', link: '/fees' });
//         });
//     });
// });



// // Route to show the confirmation page before deleting a fee record
// router.get('/confirm-delete/:id', (req, res) => {
//     const feeId = req.params.id;

//     // Fetch fee details to display on the confirmation page (optional)
//     const query = `SELECT fee_id, fee_amount, paid_date FROM Fees WHERE fee_id = ?`;

//     db.query(query, [feeId], (err, results) => {
//         if (err) {
//             console.error('Error fetching fee record:', err);
//             return res.status(500).send('Internal Server Error');
//         }
//         //optionsl >0
//         if (results.length > 0) {
//             // Render confirmation page with fee details
//             return res.render('confirm-delete', { fee: results[0] });
//         }
//         return res.status(404).send('Fee record not found');
//     });
// });

// // Route to delete a fee payment
// router.post('/delete-fee/:id', (req, res) => {
//     const feeId = req.params.id;

//     const deleteQuery = `DELETE FROM Fees WHERE fee_id = ?`;

//     db.query(deleteQuery, [feeId], (err, results) => {
//         if (err) {
//             console.error('Error deleting fee record:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         // Redirect to the fees page after deletion
//         return res.render('delete-fee', { message: 'Fee Deleted Successfully!', link: '/fees' });
         
//     });
// });


// // Route to display fee receipt
// router.get('/receipt/:fee_id', (req, res) => {
//     const feeId = req.params.fee_id;
    
//     const query = `
//         SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.name AS student_name, s.roll_number
//         FROM Fees f
//         JOIN students s ON f.student_id = s.student_id
//         WHERE f.fee_id = ?
//     `;
    
//     db.query(query, [feeId], (err, results) => {
//         if (err) {
//             console.error('Error fetching fee record:', err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             if (results.length > 0) {
//                 const fee = results[0];
//                 res.render('fee-receipt', { fee });  // Render a receipt template
//             } else {
//                 res.status(404).send('Fee record not found');
//             }
//         }
//     });
// });




// // Notify students of due fees
// router.get("/notify-due-fees/", (req, res) => {

    

//     const query = `
//         SELECT students.email, fees.fee_amount, fees.paid_date, students.name
//         FROM fees
//         JOIN students ON fees.student_id = students.student_id
//         WHERE fees.status = 'Pending'
//     `;

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching due fees:", err);
//             return res.status(500).send("Database error");
//         }

//         let recipientEmails = []; // Array to store emails


//         results.forEach(fee => {
//             if (fee.email) {
//                 recipientEmails.push(fee.email); // Store valid emails
//             const message = `Dear Student, your tuition fee of $${fee.fee_amount} is due. Please pay by ${fee.paid_date}.`;
//             sendEmail(fee.email, "Fee Payment Due", message); // Send email
//             }
//         });

//         res.render("email-sent", { email: recipientEmails, subject: "Payment Reminder" });

//     });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Change to pool
const sendEmail = require("../routes/mailer");

router.get('/fees', (req, res) => {
    if (!req.session.user) return res.redirect('/signup');

    const isAdmin = req.session.user.role === "admin";
    const query = `
        SELECT f.fee_id, f.fee_amount, f.paid_date, f.status, s.name AS student_name
        FROM Fees f
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
        FROM Fees f
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
        UPDATE Fees
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
    const checkQuery = `SELECT * FROM Fees WHERE student_id = ? AND paid_date = ?`;

    pool.query(checkQuery, [student_id, paid_date], (err, results) => {
        if (err) {
            console.error('Error checking existing fee record:', err);
            return res.status(500).send('Database error: ' + err.message);
        }
        if (results.length > 0) {
            return res.render('errorfee', { message: 'Fee entry already exists for this date!', link: '/fees' });
        }
        const insertQuery = `
            INSERT INTO Fees (student_id, fee_amount, paid_date, status) 
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
    const query = `SELECT fee_id, fee_amount, paid_date FROM Fees WHERE fee_id = ?`;

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
    const deleteQuery = `DELETE FROM Fees WHERE fee_id = ?`;

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
        FROM Fees f
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








