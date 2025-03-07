// const express = require("express");
// const bcrypt = require("bcryptjs");
// const db = require("../config/db"); // Switch to pool
// const router = express.Router();


// router.get("/signup", (req, res) => {
//     res.render("signup");  // Render the signup page with the form
// });

// // Signup Route
// router.post("/signup", async (req, res) => {
//     let { name, email, password, role } = req.body;

//      // Validate role (ensure it's one of the allowed values)
//     //  const allowedRoles = ["admin", "teacher", "student"];
//     //  if (!allowedRoles.includes(role)) {
//     //      return res.status(400).send("Invalid role selected.");
//     //  }
//     // Default role to "student" if not provided
//     role = role && ["admin", "teacher", "student"].includes(role) ? role : "student";

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     let sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
//     db.query(sql, [name, email, hashedPassword, role ], (err,results) => {
//         if (err) {
//             // console.error("Signup Error:", err);
//             return res.render("signup",{error:" The Email you entered is already used. Please sign in instead."})
//         }
//         res.redirect("/login");
//     });
// });


// router.get("/login", (req, res) => {
//     res.render("login");  // Render the signup page with the form
// });

// // Login Route
// router.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM users WHERE email = ?";
//     db.query(sql, [email], async (err, results) => {
//         if (err) return res.status(500).send("Database error");
//         if (results.length === 0) return res.render("login", { error: "User not found/* Email provided doesn't have an account" });
        
//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.render("login", { error: "Invalid credentials/Incorrect password" });

//         req.session.user = { id: user.user_id,
//              name: user.name,
//               role: user.role ||"student"
//             };
//         // res.redirect("/pp");



//                // ✅ Redirect based on role
//                if (user.role === "admin") {
//                 res.redirect("/pp"); // Admin goes to students page
//             } else if (user.role === "teacher") {
//                 res.redirect("/attendance"); // Teacher goes to attendance page
//             } else {
//                 res.redirect("/fees"); // Students go to fees page
//             }
//     });
// });

// // Logout Route
// router.get("/logout", (req, res) => {
//     req.session.destroy(() => {
//         res.redirect("/login");
//     });
// });

// module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // Change to pool

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", async (req, res) => {
    let { name, email, password, role } = req.body;
    role = role && ["admin", "teacher", "student"].includes(role) ? role : "student";
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        pool.query(sql, [name, email, hashedPassword, role], (err, results) => {
            if (err) {
                console.error("Signup DB error:", err);
                return res.render("signup", { error: "Email already used or database error: " + err.message });
            }
            res.redirect("/login");
        });
    } catch (err) {
        console.error("Signup hash error:", err);
        res.status(500).render("signup", { error: "Server error" });
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    pool.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Login DB error:", err);
            return res.status(500).send("Database error: " + err.message);
        }
        if (results.length === 0) return res.render("login", { error: "User not found" });
        
        const user = results[0];
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.render("login", { error: "Incorrect password" });
            req.session.user = { id: user.user_id, name: user.name, role: user.role || "student" };
            if (user.role === "admin") res.redirect("/pp");
            else if (user.role === "teacher") res.redirect("/attendance");
            else res.redirect("/fees");
        } catch (err) {
            console.error("Login bcrypt error:", err);
            res.status(500).render("login", { error: "Server error" });
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;