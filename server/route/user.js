const express=require("express");
const router=express.Router();
const usercontroller=require("../controller/usercontroller");
const db = require("../../config/db");
require('dotenv').config();
const { updateStudent } = require('../controller/edit'); // Import the updateStudent function
const moment = require('moment'); // Install it using: npm install moment



// Add this root route
router.get('/', (req, res) => {
  res.redirect('/pp'); // Redirect to student list
});


const auth=require("../../routes/auth")


// router.get("/",usercontroller.view)

router.get('/pp',(req,res)=>{

  if (!req.session.user) return res.redirect('/signup'); // Ensure user is logged in

  const isAdmin = req.session.user && req.session.user.role === "admin"; // Check if user is admin


    let selec=`SELECT * FROM students`
    db.query(selec,(err,result)=>{
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('home', { students: result ,isAdmin:isAdmin});
        }
    });
})
// Render form to add a new student
router.get('/addstudent', (req, res) => {
    res.render('addstudent'); // Render the form view
});

// Add a new student to the database
router.post('/add-student', (req, res) => {
    let { name, roll_number, clss, parent_contact } = req.body;

    const insertQuery = `
        INSERT INTO Students (name, roll_number, class, parent_contact)
        VALUES ('${name}','${roll_number}','${clss}','${parent_contact}')
    `;
    db.query(insertQuery, (err,result) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).send('Failed to add student.');
        } else {
            res.redirect('/pp'); // Redirect to list all students
        }
    });
});

// Route to fetch and view a student by ID or roll number
router.get("/student/:id", (req, res) => {
    // const studentId = req.params.id; // Get the student ID or roll number from the URL params

    const query = `
        SELECT * FROM Students WHERE student_id=?  OR roll_number = ?
    `;
      
    db.query(query,[req.params.id, req.params.id],  (err, result) => {
        if (err) {
            console.error("Error fetching student details:", err);
            res.status(500).send("Internal Server Error");
        } else if (result.length === 0) {
            res.status(404).send("Student not found");
        } else {
            res.render("studentDetail", { student: result[0] });
        }
    });
});

// Route to search for students by ID or Roll Number
router.get('/search', (req, res) => {
    const searchQuery = req.query.query; // Get the search input from query params
   console.log('Search Query Input:', searchQuery);
    // Query to find students matching the ID or Roll Number
    const query = `
        SELECT * FROM Students WHERE student_id = ? OR roll_number = ?
    `;

    db.query(query, [searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error('Error searching for students:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.send('<h2>No matching students found.</h2><a href="/pp">Back to Student List</a>');
        }

        // Render the search results
        res.render('searchresults', { searchResults: results });
    });
});

// GET route to render edit form with student data
router.get('/edit-student/:id', (req, res) => {
    const studentId = req.params.id;
    const selectQuery = `SELECT * FROM Students WHERE student_id = ?`;
  
    db.query(selectQuery, [studentId], (err, result) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('editstudent', { student: result[0] });
      }
    });
  });
  
  // POST route to update student data
  router.post('/edit-student/:id', (req, res) => {
    const { name, roll_number, clss, parent_contact } = req.body;
    const studentId = req.params.id;
  
    const updateQuery = `UPDATE Students SET name = ?, roll_number = ?, class = ?, parent_contact = ? WHERE student_id = ?`;
  
    db.query(updateQuery, [name, roll_number, clss, parent_contact, studentId], (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Show success message with a link back to the list
        res.render('updatesucess', { message: 'Student updated successfully!', link: '/pp' });
       
      }
    });
  });
  
// Route to delete a student
router.get('/delete-student/:id', (req, res) => {
    const studentId = req.params.id;
    const deleteQuery = `DELETE FROM students WHERE student_id = ?`;
  
    db.query(deleteQuery, [studentId], (err, result) => {
      if (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Internal Server Error');
      } else {
      
        res.render('deletesucess', { message: 'Student Deleted successfully!', link: '/pp' });
      }
    });
  });
  

  


module.exports=router;


