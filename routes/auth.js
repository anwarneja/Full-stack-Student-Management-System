const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("signup");  // Render the signup page with the form
});

// Signup Route
router.post("/signup", async (req, res) => {
    let { name, email, password, role } = req.body;

     // Validate role (ensure it's one of the allowed values)
    //  const allowedRoles = ["admin", "teacher", "student"];
    //  if (!allowedRoles.includes(role)) {
    //      return res.status(400).send("Invalid role selected.");
    //  }
    // Default role to "student" if not provided
    role = role && ["admin", "teacher", "student"].includes(role) ? role : "student";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role ], (err,results) => {
        if (err) {
            // console.error("Signup Error:", err);
            return res.render("signup",{error:" The Email you entered is already used. Please sign in instead."})
        }
        res.redirect("/login");
    });
});


router.get("/login", (req, res) => {
    res.render("login");  // Render the signup page with the form
});

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).send("Database error");
        if (results.length === 0) return res.render("login", { error: "User not found/* Email provided doesn't have an account" });
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render("login", { error: "Invalid credentials/Incorrect password" });

        req.session.user = { id: user.user_id,
             name: user.name,
              role: user.role ||"student"
            };
        // res.redirect("/pp");



               // ✅ Redirect based on role
               if (user.role === "admin") {
                res.redirect("/pp"); // Admin goes to students page
            } else if (user.role === "teacher") {
                res.redirect("/attendance"); // Teacher goes to attendance page
            } else {
                res.redirect("/fees"); // Students go to fees page
            }
    });
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
