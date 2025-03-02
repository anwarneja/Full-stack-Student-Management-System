const db = require('./config/db');
const bcrypt = require('bcrypt');
// Create Students table
let students = `
CREATE TABLE IF NOT EXISTS Students(
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    class VARCHAR(10) NOT NULL,
    parent_contact VARCHAR(15) NOT NULL
)`;

let fees = `
CREATE TABLE IF NOT EXISTS Fees(
    fee_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    fee_amount DECIMAL(10,2) NOT NULL,
    paid_date DATE,
    status ENUM('Paid', 'Pending') DEFAULT 'Pending'
)`;

let attendance = `
CREATE TABLE IF NOT EXISTS Attendance(
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent') DEFAULT 'Absent'
)`;

// Create Students table
// db.query(students, (err, results) => {
//     if (err) {
//         console.error('Error creating Students table:', err);
//     } else {
//         console.log('Students table created successfully');
        
//         // Once Students table is created, insert data
//         let insert = `
//             INSERT INTO Students (name, roll_number, class, parent_contact)
//             VALUES
//             ('Anwar Neja', 'q149', '10A', '0976543210'),
//             ('Ilhm Redi', 'n002', '10A', '0986543211'),
//             ('Ikram Neja', 'v301', '10B', '0976543212'),
//             ('Ayesha Siddiqui', 'h202', '10B', '0976543213'),
//             ('Ibrahim Sheikh', 'r001', '10C', '0987543214'),
//             ('Zainab Ahmd', 'f002', '10C', '0987543215')
//         `;

//         db.query(insert, (err, results) => {
//             if (err) {
//                 console.error('Error inserting data into Students:', err);
//             } else {
//                 console.log('Data inserted into Students successfully:', results);
//             }
//         });
//     }
// });

// // Create Fees table
// db.query(fees, (err, results) => {
//     if (err) {
//         console.error('Error creating Fees table:', err);
//     } else {
//         console.log('Fees table created successfully');
//     }
// });

// // Create Attendance table
// db.query(attendance, (err, results) => {
//     if (err) {
//         console.error('Error creating Attendance table:', err);
//     } else {
//         console.log('Attendance table created successfully');
//     }
// });

// // Example Update query
// let update = `UPDATE Students SET name = 'Anwar Neja' WHERE roll_number = 'q149'`;
// db.query(update, (err, results) => {
//     if (err) {
//         console.error('Error updating data:', err);
//     } else {
//         console.log('Data updated successfully');
//     }
// });


// const deleteFees = `DELETE FROM Fees`;

// db.query(deleteFees, (err, results) => {
//     if (err) {
//         console.error('Error deleting fee data:', err);
//     } else {
//         console.log('Fee data deleted successfully:', results);
//     }
// });
// const insertFeeData = `
//   INSERT INTO Fees (student_id, fee_amount, paid_date, status)
//   VALUES
//   (1, 1000, '2025-01-03', 'Paid'),
//   (2, 1200, '2025-01-08', 'Pending'),
//   (3, 1400, '2025-01-15', 'Paid'),
//   (4, 1600, '2025-01-16', 'Paid'),
//   (5, 1800, '2025-01-19', 'Pending'),
//   (6, 2000, '2025-01-21', 'Paid');
// `;

// db.query(insertFeeData, (err, result) => {
//   if (err) {
//     console.error('Error inserting fee data:', err);
//   } else {
//     console.log('Fee data inserted successfully');
//   }
// });

// const updateEmailsQuery = `
// UPDATE students
// SET email = CASE student_id
//     WHEN 1 THEN 'anwarnejanassir@gmail.com'
//     WHEN 2 THEN 'ilham@gmail.com'
//     WHEN 3 THEN 'ikram@gmail.com'
//     WHEN 4 THEN 'anwarneja55@gmail.com'
//     WHEN 5 THEN 'ibrahim@gmail.com'
//     WHEN 6 THEN 'zainab@gmail.com'
//     ELSE email  
// END
// WHERE student_id IN (1, 2, 3, 4, 5, 6);  
// `;

// db.query(updateEmailsQuery, (err, results) => {
// if (err) {
//     console.error("Error updating emails:", err);
//    } else {
//     console.log("Emails updated successfully:", results);
//     }



// });


// let attend=`INSERT INTO Attendance (student_id, attendance_date, status)
// VALUES 
// (1, '2025-02-16', 'Present'),
// (2, '2025-02-17', 'Absent'),
// (3, '2025-02-18', 'Present'),
// (4, '2025-02-19', 'Present'),
// (5, '2025-02-20', 'Absent'),
// (6, '2025-02-21', 'Present')`;


// db.query(attend,(err,results)=>{
//     if(err){
//         console.error("Error inserting attendance data:",err);
//         }
//         else{
//             console.log("Attendance data inserted successfully:",results);
//             }
//             });

let users=`CREATE TABLE if not exists users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') DEFAULT 'student'
)`;
db.query(users,(err,results)=>{
    if(err){
        console.error("Error creating users table:",err);
        }
        else{
            console.log("Users table created successfully:",results);
            }
            });
      

           
const adminPassword = 'admin'; // Change this to a strong password
const hashedPassword = bcrypt.hashSync(adminPassword, 10); // Hashing the password

let i = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;

db.query(i, ['admin', 'admin@gmail.com', hashedPassword, 'admin'], (err, results) => {
    if (err) {
        console.error("Error inserting admin user:", err);
    } else {
        console.log("Admin user inserted successfully:", results);
    }
});
