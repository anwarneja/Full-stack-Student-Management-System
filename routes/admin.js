
const express = require("express");
const db = require("../config/db"); // Database connection

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


