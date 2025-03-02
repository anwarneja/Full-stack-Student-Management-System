const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Fetch unread notifications for a student and render dashboard
router.get("/notifications/:student_id", (req, res) => {
    const studentId = req.params.student_id;

    if (!studentId) {
        return res.status(400).send("Student ID is required.");
    }

    db.query(
        "SELECT * FROM notifications WHERE student_id = ? AND status = 'unread'",
        [studentId],
        (err, results) => {
            if (err) {
                console.error("Error fetching notifications:", err);
                return res.status(500).send("Server error");
            }

            res.render("dashboard", { notifications: results, studentId });
        }
    );
});

// Mark all notifications as read
router.post("/notifications/mark-read", (req, res) => {
    const studentId = req.body.student_id;

    if (!studentId) {
        return res.status(400).send("Student ID is required.");
    }

    db.query(
        "UPDATE notifications SET status = 'read' WHERE student_id = ?",
        [studentId],
        (err) => {
            if (err) {
                console.error("Error marking notifications as read:", err);
                return res.status(500).send("Server error");
            }

            res.redirect(`/dashboard`);
        }
    );
});

module.exports = router;
