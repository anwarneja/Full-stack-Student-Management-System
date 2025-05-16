


const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const pool = require("../../config/db"); // Change to pool
require('dotenv').config();
const { updateStudent } = require('../controller/edit');
const moment = require('moment');

router.get('/', (req, res) => {
  res.redirect('/pp');
});

router.get('/pp', (req, res) => {
  if (!req.session.user) return res.redirect('/signup');
  const isAdmin = req.session.user && req.session.user.role === "admin";
  let selec = `SELECT * FROM students`;
  pool.query(selec, (err, result) => { // Change db to pool
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).send('Database error: ' + err.message);
    } else {
      res.render('home', { students: result, isAdmin: isAdmin });
    }
  });
});

router.get('/addstudent', (req, res) => {
  res.render('addstudent');
});

router.post('/add-student', (req, res) => {
  let { name, roll_number, clss, parent_contact } = req.body;
  const insertQuery = `
      INSERT INTO students (name, roll_number, class, parent_contact)
      VALUES (?, ?, ?, ?)
  `;
  pool.query(insertQuery, [name, roll_number, clss, parent_contact], (err, result) => { // Change db to pool
    if (err) {
      console.error('Error adding student:', err);
      res.status(500).send('Database error: ' + err.message);
    } else {
      res.redirect('/pp');
    }
  });
});

router.get("/student/:id", (req, res) => {
  const query = `
      SELECT * FROM students WHERE student_id = ? OR roll_number = ?
  `;
  pool.query(query, [req.params.id, req.params.id], (err, result) => { // Change db to pool
    if (err) {
      console.error("Error fetching student details:", err);
      res.status(500).send("Database error: " + err.message);
    } else if (result.length === 0) {
      res.status(404).send("Student not found");
    } else {
      res.render("studentdetail", { student: result[0] });
    }
  });
});

router.get('/search', (req, res) => {
  if (!req.session.user) return res.redirect('/signup');
  const searchQuery = req.query.query;
  console.log('Search Query Input:', searchQuery);
  const query = `
      SELECT * FROM students WHERE student_id = ? OR roll_number = ?
  `;
  pool.query(query, [searchQuery, searchQuery], (err, results) => { // Change db to pool
    if (err) {
      console.error('Error searching for students:', err);
      return res.status(500).send('Database error: ' + err.message);
    }
    if (results.length === 0) {
      return res.send('<h2>No matching students found.</h2><a href="/pp">Back to Student List</a>');
    }
    res.render('searchresults', { searchResults: results });
  });
});

router.get('/edit-student/:id', (req, res) => {
  const studentId = req.params.id;
  const selectQuery = `SELECT * FROM students WHERE student_id = ?`;
  pool.query(selectQuery, [studentId], (err, result) => { // Change db to pool
    if (err) {
      console.error('Error fetching student data:', err);
      res.status(500).send('Database error: ' + err.message);
    } else {
      res.render('editstudent', { student: result[0] });
    }
  });
});

router.post('/edit-student/:id', (req, res) => {
  const { name, roll_number, clss, parent_contact } = req.body;
  const studentId = req.params.id;
  const updateQuery = `UPDATE students SET name = ?, roll_number = ?, class = ?, parent_contact = ? WHERE student_id = ?`;
  pool.query(updateQuery, [name, roll_number, clss, parent_contact, studentId], (err, result) => { // Change db to pool
    if (err) {
      console.error('Error updating student:', err);
      res.status(500).send('Database error: ' + err.message);
    } else {
      res.render('updatesucess', { message: 'Student updated successfully!', link: '/pp' });
    }
  });
});

router.get('/delete-student/:id', (req, res) => {
  const studentId = req.params.id;
  const deleteQuery = `DELETE FROM students WHERE student_id = ?`;
  pool.query(deleteQuery, [studentId], (err, result) => { // Change db to pool
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).send('Database error: ' + err.message);
    } else {
      res.render('deletesucess', { message: 'Student Deleted successfully!', link: '/pp' });
    }
  });
});

module.exports = router;