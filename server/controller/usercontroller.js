// router.post('/add-student', (req, res) => {
//     const { name, roll_number, class, parent_contact } = req.body;
  
//     let insertQuery = `INSERT INTO students (name, roll_number, class, parent_contact) VALUES (?, ?, ?, ?)`;
//     db.query(insertQuery, [name, roll_number, 'class', parent_contact], (err, result) => {
//       if (err) {
//         console.error('Error adding student:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.redirect('/'); // Redirect to home page after adding student
//       }
//     });
//   });
  