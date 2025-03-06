const mysql = require("mysql");
const { engine } = require("express-handlebars");
const express = require("express");
var app = express();
const cors = require("cors");
// const db=require("./config/db");
const db = require("./config/db");  // Adjust the path if necessary
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");

require('dotenv').config();

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));



//The session middleware in Express allows you to store session data on the server, typically to track things like whether a user is logged in or not. Let's break down the three options (secret, resave, and saveUninitialized) and understand their role in the session setup:

// 1. secret
// Role: The secret is a key that is used to sign the session ID cookie, which is sent to the client (browser).

// Why it's important: This signing process ensures that the session data cannot be tampered with. If someone tries to modify the session cookie, it won't be valid because the signature won't match the secret.

// Example:

// js
// Copy code
// app.use(session({
//     secret: "secretkey", // This is the secret key to sign the session cookie.
//     resave: false,
//     saveUninitialized: true
// }));
// Here, "secretkey" is the key that will be used to sign the session data and ensure the integrity of the session cookie.

// 2. resave
// Role: This option determines whether the session should be saved back to the session store even if it wasn't modified during the request.

// Why it's important:

// If resave is set to false, the session will only be saved if it was modified (e.g., if the user logged in or their session data was updated).
// If resave is set to true, the session will be saved on every request, even if it wasn’t modified, which can be inefficient.
// Example:

// js
// Copy code
// app.use(session({
//     secret: "secretkey",
//     resave: false,  // Don't save the session if it was not modified.
//     saveUninitialized: true
// }));
// Here, setting resave: false is more efficient and recommended for performance because it only saves the session if something in it has changed.

// 3. saveUninitialized
// Role: This option tells the session store whether to save a session that has not been modified yet.

// Why it's important:

// If saveUninitialized is true, a session will be saved to the store even if no data was added to it.
// If saveUninitialized is false, the session will not be stored unless something is added (like user data when they log in).
// Example:

// js
// Copy code
// app.use(session({
//     secret: "secretkey",
//     resave: false,
//     saveUninitialized: true  // Save sessions even if they haven't been initialized.
// }));
// Setting saveUninitialized: true allows you to store sessions that are newly created but don't yet have any user data. If you only want to store sessions that have actual data (such as logged-in user info), you might set this to false.

// Summary:
// secret: Used to sign the session cookie to ensure its integrity.
// resave: Determines whether the session is saved back to the store on each request (even if it wasn’t modified).
// saveUninitialized: Controls whether sessions are saved to the store even if they haven’t been modified yet.
// These options help manage how sessions behave, making sure they're secure and efficient. Would you like further clarification on how to configure these options?








// Middleware to make `user` available in Handlebars
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
//If req.session.user exists, res.locals.user will be req.session.user.
// If req.session.user does not exist (is undefined or null), res.locals.user will be null.
// Purpose: Ensures res.locals.user always has a value (either a user object or null).



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Static files
app.use(express.static("public"));

// Templating engine setup
app.engine("hbs", engine({ extname: ".hbs",layoutsDir: __dirname + '/views/layouts' }));
app.set("view engine", "hbs");
app.set("views",path.join(__dirname,"views"))
// Route that renders home.hbs using main.hbs layout
// app.get('/pp', (req, res) => {
//     let selec=`SELECT * FROM students`
//     db.query(selec,(err,result)=>{
//         if (err) {
//             console.error('Error fetching students:', err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.render('home', { students: result });
//         }
//     });
//     });
   
const routes=require("./server/route/user");
app.use('/',routes)
 

const feeRoutes = require("./routes/fees");
app.use('/', feeRoutes);  // Fee-related routes


const attendanceRouter = require("./routes/attendance"); // Include the attendance router
app.use('/', attendanceRouter); // Use the attendance router for attendance-related routes

const attendanceRoutert = require("./routes/absenteeism"); // Include the attendance router
app.use('/', attendanceRoutert); // Use the attendance router for attendance-related routes

const admin1=require("./routes/admin");
app.use('/',admin1);






app.use('/',authRoutes);


app.get("/pp", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("home", { user: req.session.user });
});



const { isAuthenticated, isAdmin, isTeacher, isStudent } = require("./middlewares/middleware");





//Now, apply the middleware to restrict access to certain pages.


// const { isAuthenticated, isAdmin, isTeacher, isStudent } = require("./middlewares/middleware");

// // Fees management (Only for Admins & Teachers)
// app.get("/fees", isAuthenticated, (req, res) => {
//     if (req.session.user.role === "admin" || req.session.user.role === "teacher") {
//         res.render("fees");
//     } else {
//         res.status(403).send("Access Denied: Only Admins & Teachers");
//     }
// });

// // Attendance (Only for Teachers)
// app.get("/attendance", isAuthenticated, isTeacher, (req, res) => {
//     res.render("attendance");
// });

// // View Student Details (Only for Students)
// app.get("/studentdetail", isAuthenticated, isStudent, (req, res) => {
//     res.render("studentdetail");
// });

// // Admin-only Features (e.g., Adding Fees)
// app.get("/add-fee", isAuthenticated, isAdmin, (req, res) => {
//     res.render("add-fee");
// });












// // Dashboard: Only logged-in users can access
// app.get("/dashboard", isAuthenticated, (req, res) => {
//     res.render("dashboard", { user: req.session.user });
// });

// // Student Management: Only Admins can access
// app.use("/students", isAdmin, require("./routes/students"));

// // Attendance: Only Teachers can access
// app.use("/attendance", isTeacher, require("./routes/attendance"));

// // Fees: Only Admins & Students can access
// app.get("/fees", isAuthenticated, (req, res) => {
//     if (req.session.user.role === "admin" || req.session.user.role === "student") {
//         return res.render("fees", { user: req.session.user });
//     }
//     res.status(403).send("Access Denied");
// });








// Start the server
app.listen(3000, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server listening to port: 3000");
    }
});




//explanation od some things 
//Flow of req.session.user and res.locals.user
// 1. req.session.user (Session User)
// This is stored in the session and persists across multiple requests.

// Flow of req.session.user:
// User logs in:

// When a user logs in, you validate their credentials and store their details in req.session.user.
// Example:
// js
// Copy code
// req.session.user = { id: user.user_id, name: user.name, role: user.role };
// Session middleware saves user data:

// Express-session automatically stores this data in memory (or a database, if configured).
// The user remains logged in because their session data is saved.
// Session persists across requests:

// When the user visits another page, req.session.user remains available.
// Example:
// js
// Copy code
// app.get("/dashboard", (req, res) => {
//     if (!req.session.user) {
//         return res.redirect("/login");
//     }
//     res.render("dashboard", { user: req.session.user });
// });
// Here, req.session.user ensures that only logged-in users can access the dashboard.
// User logs out:

// When a user logs out, their session is destroyed:
// js
// Copy code
// req.session.destroy(() => {
//     res.redirect("/login");
// });
// This removes req.session.user, and the user is no longer considered logged in.
// 2. res.locals.user (Local User)
// This is available only during the request-response cycle and is used in Handlebars templates.

// Flow of res.locals.user:
// Middleware runs before rendering views:

// Every time a request is made, this middleware ensures that res.locals.user is set:
// js
// Copy code
// app.use((req, res, next) => {
//     res.locals.user = req.session.user || null;
//     next();
// });
// This means:
// If req.session.user exists, res.locals.user will store that data.
// If req.session.user is null, res.locals.user will also be null.
// Available in all Handlebars views:

// Since res.locals.user is set before rendering views, it allows us to check if a user is logged in.
// Example in Handlebars (.hbs):
// hbs
// Copy code
// {{#if user}}
//     <li class="nav-item">
//         <a class="nav-link text-light" href="/logout"><i class="bi bi-box-arrow-right"></i> Logout</a>
//     </li>
// {{else}}
//     <li class="nav-item">
//         <a class="nav-link text-light" href="/login"><i class="bi bi-box-arrow-in-right"></i> Login</a>
//     </li>
// {{/if}}
// If res.locals.user contains user data, the Logout button appears.
// If res.locals.user is null, the Login and Signup buttons appear.
// Does NOT persist across multiple requests:

// Unlike req.session.user, res.locals.user is reset with each request.
// If a user logs out (req.session.destroy()), req.session.user is gone.
// When the next request comes, res.locals.user will be null, so the template updates.
// Key Differences
// Feature	req.session.user (Session)	res.locals.user (Local)
// Scope	Persistent across requests	Available only during request-response cycle
// Where it's stored	Stored in session (server-side)	Stored in res.locals (temporary)
// When it updates	Updates when user logs in/out	Updates on every request
// Usage	Used for authentication logic	Used for rendering UI dynamically
// Summary
// req.session.user: Persistent, used to track logged-in users across requests.
// res.locals.user: Temporary, used for making user available in Handlebars templates dynamically.
// Let me know if anything needs more clarification! 🚀