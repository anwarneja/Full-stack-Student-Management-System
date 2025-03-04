# 🎓 Student Management System  

A full-stack web application developed as part of the **Full Stack Web Development** course at **Mizan Institute of Technology (MiT)** under **Instructor Ahmed**. This project efficiently manages student information, tuition fee payments, and attendance tracking.  

## 📌 Course Details  
- **Institution**: Mizan Institute of Technology (MiT)  
- **Course**: Full Stack Web Development  
- **Instructor**: Ahmed  
- **Mini-Project**: Student Management System  
- **Year**: 2024  

## 🚀 Live Demo  

You can view the live demo of the Student Management System [here](#). *(Replace with actual live demo link)*  

## 🛠 Technologies Used  

- **Backend**: 🟢 Node.js, ⚡ Express.js  
- **Database**: 🗄️ MySQL  
- **Frontend**: 🎨 Handlebars.js, 💠 Bootstrap  
- **Authentication**: 🔑 Express Session  
- **Additional Tools**: ✉️ Nodemailer (for email notifications), 🔄 Socket.io (for real-time updates), 🛠️ Postman (for API testing), Git/GitHub (for version control)  

## ✨ Key Features  

✅ **Student Management**: Add, edit, and delete student profiles. View detailed student records.  
✅ **Tuition Fee Management**: Track fee payments, generate receipts, and notify students/parents of due payments via email.  
✅ **Attendance Tracking**: Record daily attendance, generate reports, and notify parents about absenteeism.  
✅ **Search & Reporting**: Search students by name, roll number, or class. Generate reports for attendance, fee payments, and performance.  
✅ **Authentication**: Secure login and signup system using Express Session.  
✅ **Role-Based Access**: Different levels of access for administrators, teachers, and students.  

## 📥 Installation  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/anwarneja/Student-Management-System.git
Navigate into the project directory:

bash
Copy code
cd Student-Management-System
Install dependencies:

bash
Copy code
npm install
Setup environment variables:
Create a .env file in the root directory and add the following:

ini
Copy code
DB_HOST=localhost
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=student_management
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
Run the application:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000 to view the application.

📂 Database Schema
Students Table
Column Name	Data Type	Description
STUDENT_ID	INT (PK)	Unique ID for each student
NAME	VARCHAR(50)	Student’s full name
ROLL_NUMBER	VARCHAR(20)	Unique roll number
CLASS	VARCHAR(10)	Class/grade of the student
PARENT_CONTACT	VARCHAR(15)	Contact number of parent/guardian
Fees Table
Column Name	Data Type	Description
FEE_ID	INT (PK)	Unique fee ID
STUDENT_ID	INT (FK)	References Students(STUDENT_ID)
FEE_AMOUNT	DECIMAL(10,2)	Total fee amount
PAID_DATE	DATE	Date of fee payment
STATUS	ENUM('Paid', 'Pending')	Fee payment status
Attendance Table
Column Name	Data Type	Description
ATTENDANCE_ID	INT (PK)	Unique attendance ID
STUDENT_ID	INT (FK)	References Students(STUDENT_ID)
ATTENDANCE_DATE	DATE	Date of attendance
STATUS	ENUM('Present', 'Absent')	Attendance status
📸 Screenshots
🏠 Dashboard


💰 Fee Management


📝 Suggested Development Tasks
1. Backend Development
✅ Set up API endpoints for managing students, fees, and attendance.
✅ Connect the API to the database.
✅ Implement the fee payment notification system.

2. Frontend Development
✅ Build user interfaces for student and fee management.
✅ Create attendance recording functionality.

3. Testing
✅ Test API endpoints using Postman.
✅ Validate the UI for responsiveness and accuracy.

🚀 Advanced Extensions
✨ Add automated email notifications for attendance and fee reminders.
✨ Implement role-based access for admins and teachers.
✨ Generate PDF reports for attendance and fee payments.

🤝 Contributing
We welcome contributions! If you would like to contribute to this project, please fork the repository and submit a pull request.

Before submitting a pull request, please ensure the following:
✅ Your code follows the project's coding conventions.
✅ You have tested your changes.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

