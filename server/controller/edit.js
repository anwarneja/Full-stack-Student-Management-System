// edit.js (module)
const db = require("../../config/db"); // Import database connection

// Function to handle the update logic for a student
function updateStudent(req, res) {
    const { name, roll_number, clss, parent_contact } = req.body;
    const studentId = req.params.id;

    const updateQuery = `UPDATE students SET name = ?, roll_number = ?, class = ?, parent_contact = ? WHERE student_id = ?`;

    db.query(updateQuery, [name, roll_number, clss, parent_contact, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).send('Internal Server Error');
        } else {
            return res.sendStatus(200); // Return 200 OK status on successful update
        }
    });
}

// Export the function for use in the router
module.exports = { updateStudent };
