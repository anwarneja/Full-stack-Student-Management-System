# Student Management System

A full-stack web application for managing student data, attendance, and fee payments. This system provides functionalities such as adding, updating, and viewing student details, managing fee payments, tracking attendance, and generating reports.

## Live Demo

You can view the live demo of the Student Management System [here](#). *(Replace with actual live demo link)*

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: Handlebars.js, Bootstrap
- **Authentication**: Express Session
- **Others**: Nodemailer (for email notifications), Socket.io (for real-time updates)

## Features

- **Student Management**: Add, edit, and delete student information.
- **Fee Management**: Add, edit, and view fee payments.
- **Attendance Tracking**: Add attendance, generate attendance reports.
- **Authentication**: Secure login and signup system using Express Session.
- **Role-Based Access**: Different levels of access for administrators, teachers, and students.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anwarneja/Student-Management-System.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Student-Management-System
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Setup environment variables**:  
   Create a `.env` file in the root directory and add the following:
   ```bash
   DB_HOST=localhost
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=student_management
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   ```

5. **Run the application**:
   ```bash
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to view the application.

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Fee Management
![Fee Management](screenshots/fee-management.png)

## Contributing

We welcome contributions! If you would like to contribute to this project, please fork the repository and submit a pull request.

Before submitting a pull request, please ensure the following:
- Your code follows the project's coding conventions.
- You have tested your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

