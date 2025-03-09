// const express = require('express');
// const router = express.Router();
// const db = require("../config/db");

// router.get('/attendance', (req, res) => {
//     const query = `
//         SELECT students.name, students.roll_number, students.class, attendance.attendance_date as date, attendance.status
//         FROM attendance
//         JOIN students ON attendance.student_id = students.student_id
//     `;
    
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching attendance:", err);
//             return res.status(500).send("Database error");
//         }
        
//         res.render('attendance', { attendance: results });
//     });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require("../config/db");

// Route to display attendance management page
router.get('/attendance', (req, res) => {
    if (!req.session.user) return res.redirect('/signup'); // Ensure user is logged in

    const isAdmin = req.session.user && req.session.user.role === "admin"; // Check if user is admin

    // const isAdmin = req.session.user.role === "admin"; // Check if user is admin


    const query = `
        SELECT students.name, students.roll_number, students.class, attendance.attendance_date as date, attendance.status, attendance.attendance_id
        FROM attendance
        JOIN students ON attendance.student_id = students.student_id
    `;
    
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching attendance:", err);
            return res.status(500).send("Database error");
        }
        
        res.render('attendance', { attendance: results ,isAdmin});
    });
});

// Route to render the Add Attendance Form
router.get('/attendance/add', (req, res) => {
    const query = 'SELECT * FROM students';  // Get all students
    
    pool.query(query, (err, students) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send("Database error");
        }

        res.render('attendance_form', { students: students });  // Render form with student list
    });
});

// Route to handle form submission (Add attendance)
router.post('/attendance/add', (req, res) => {
    const { student_id, attendance_date, status } = req.body;  // Extract form data

    const query = "INSERT INTO attendance (student_id, attendance_date, status) VALUES (?, ?, ?)";
    
    pool.query(query, [student_id, attendance_date, status], (err, result) => {
        if (err) {
            console.error("Error inserting attendance:", err);
            return res.status(500).send("Database error");
        }
        const message = "The attendance has been added successfully.";  // Success message
    return   res.render('attendance_success');  // Render the success page after insertion
    });
});




router.get('/attendance/reports', (req, res) => {
    const { startDate, endDate } = req.query;

    const sql = `
        SELECT s.student_id, s.name, 
            SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present_days,
            SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) AS absent_days
        FROM attendance a
        JOIN students s ON a.student_id = s.student_id
        WHERE attendance_date BETWEEN ? AND ?
        GROUP BY s.student_id, s.name
    `;

    pool.query(sql, [startDate, endDate], (err, results) => {
        if (err) throw err;
        res.render('attendance_reports', { results, startDate, endDate });
    });
});





// Delete Attendance Record
router.post('/attendance/delete/:id', (req, res) => {
    const attendanceId = req.params.id;
    const deleteQuery = 'DELETE FROM attendance WHERE attendance_id = ?';

    pool.query(deleteQuery, [attendanceId], (err, result) => {
        if (err) {
            console.error('Error deleting attendance record:', err);
            return res.status(500).send('Error deleting attendance');
        }

        res.render('attendance-delete', { message: 'Attendance record deleted successfully!' });
    });
});

module.exports = router;



