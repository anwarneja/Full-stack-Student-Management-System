const mysql = require("mysql");
const { engine } = require("express-handlebars");
const express = require("express");
var app = express();
const cors = require("cors");
// const db=require("./config/db");
const db = require("./config/db"); // Adjust the path if necessary
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");

require("dotenv").config();

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to make `user` available in Handlebars
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Static files
app.use(express.static("public"));

// Templating engine setup
app.engine(
  "hbs",
  engine({ extname: ".hbs", layoutsDir: __dirname + "/views/layouts" })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

console.log("DEBUG user.js:", JSON.stringify(require("./server/route/user")));
const routes = require("./server/route/user");
console.log("DEBUG fees.js:", JSON.stringify(require("./routes/fees")));
const feeRoutes = require("./routes/fees");
console.log(
  "DEBUG attendance.js:",
  JSON.stringify(require("./routes/attendance"))
);
const attendanceRouter = require("./routes/attendance");
console.log(
  "DEBUG absenteeism.js:",
  JSON.stringify(require("./routes/absenteeism"))
);
const attendanceRoutert = require("./routes/absenteeism");
console.log("DEBUG admin.js:", JSON.stringify(require("./routes/admin")));
const admin1 = require("./routes/admin");
console.log("DEBUG auth.js:", JSON.stringify(require("./routes/auth")));

app.use("/", routes);

app.use("/", feeRoutes); // Fee-related routes

app.use("/", attendanceRouter); // Use the attendance router for attendance-related routes

app.use("/", attendanceRoutert); // Use the attendance router for attendance-related routes

app.use("/", admin1);

app.use("/", authRoutes);

app.get("/pp", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.render("home", { user: req.session.user });
});

const {
  isAuthenticated,
  isAdmin,
  isTeacher,
  isStudent,
} = require("./middlewares/middleware");

// // Start the server
// app.listen(3000, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Server listening to port: 3000");
//     }
// });
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System"); // Simple test
  // Or: res.render('index'); if you have an index.hbs
});

module.exports = app;
