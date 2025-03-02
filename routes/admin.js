// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const db = require("../config/db");


// // const router = express.Router();





// // router.get('/dashboard',(req, res) => {
    
// //     if (!req.session.role) return res.status(403).send("You are not logged in");
// //     if (req.session.role !== 'admin') return res.status(403).send("Access Denied");

// //     db.query('SELECT * FROM users', (err, results) => {
// //         if (err) return res.status(500).send("Database error");

// //         res.render('admin_dashboard', { users: results });
// //     });
// // });

// // module.exports = router;
// const express = require("express");
// const db = require("../config/db"); // Your database connection
// const { isAdmin } = require("../middlewares/middleware"); // Import the admin middleware

// const router = express.Router();

// // Debugging: Log session user before reaching the middleware
// // router.get("/dashboard", (req, res, next) => {
// //     console.log("Session User:", req.session.user); // Check session data
// //     next();
// // });
// // Admin dashboard route - Fetch all users
// router.post("/dashboard", isAdmin, (req, res) => {
//     const {name,email}=req.body;
//     const query = `insert into users(name,email,password,role || "student")
//     values(?,?)`; // Fetch all users from the database

//     db.query(query,[name,email], (err, results) => {
//         if (err) {
//             console.error("Database error:", err);
//             return res.status(500).send("Internal Server Error");
//         }

//         res.render("admin_dashboard", { users: results,  }); // Pass users data to the view
//     });
// });

// module.exports = router;
const express = require("express");
const db = require("../config/db"); // Database connection
// const { isAuthenticated, isAdmin } = require("../middlewares/middleware"); // Middleware to check login

const router = express.Router();

// Admin dashboard route - Fetch all users
router.get("/dashboard",  (req, res) => {
    const query = "SELECT user_id, name, email,role FROM users"; // Fetch all users
    console.log(req.session.user); // Check what session data is stored

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.render("admin_dashboard", { users: results }); // Pass users to the view
    });
});

router.post("/delete_user/:id", (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send("Invalid request: User ID is required.");
    }
    console.log("User ID to delete:", userId); // Debugging

    const deleteQuery = "DELETE FROM users WHERE user_id = ?";

    db.query(deleteQuery, [userId], (err, results) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.redirect("/dashboard"); // Ensure the redirect path is correct
    });
});



//to create anew user
router.get("/create_user", (req, res) => {
    res.render("create_user",{message:"hello"});
    
});
router.post("/create_user",(req,res)=>{
    console.log("Form data received:", req.body); // Debugging
    const {name,email,password,role}=req.body;
    const query="INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";
    db.query(query,[name,email,password,role],(err,results)=>{
        if(err){
            console.error("Error creating user:",err);
            return res.status(500).send("Internal Server Error");
            }
            res.redirect("/dashboard");
            });
            
})



// router.get("/delete_user/:id",(req,res)=>{
//   let admin=req.params.id;

//   let del=`delete from users where id =?`;
//   db.query(del,[admin],(err,results)=>{
//     if(err){
//       console.error(errror ); 
//     }
//   res.redirect("/dashboard");

// })
// });
module.exports = router;
