-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2025 at 08:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `st`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `attendance_date` date NOT NULL,
  `status` enum('Present','Absent') DEFAULT 'Absent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `student_id`, `attendance_date`, `status`) VALUES
(3, 3, '2025-02-18', 'Present'),
(5, 5, '2025-02-20', 'Absent'),
(6, 6, '2025-02-21', 'Present'),
(9, 4, '2025-02-17', 'Absent'),
(10, 5, '2025-02-19', 'Present'),
(11, 6, '2025-02-19', 'Present'),
(13, 5, '2025-02-17', 'Absent'),
(15, 5, '2025-02-27', 'Present'),
(18, 1, '2025-02-17', 'Absent');

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--

CREATE TABLE `fees` (
  `fee_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `fee_amount` decimal(10,2) NOT NULL,
  `paid_date` date DEFAULT NULL,
  `status` enum('Paid','Pending') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fees`
--

INSERT INTO `fees` (`fee_id`, `student_id`, `fee_amount`, `paid_date`, `status`) VALUES
(1, 1, 1000.00, '2025-02-02', 'Pending'),
(2, 2, 1200.00, '2025-01-08', 'Pending'),
(3, 3, 1400.00, '2025-01-15', 'Paid'),
(4, 4, 1600.00, '2025-01-16', 'Paid'),
(5, 5, 1800.00, '2025-01-19', 'Pending'),
(6, 6, 2700.00, '2025-02-28', 'Paid'),
(10, 5, 2321.00, '2025-02-16', 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('unread','read') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `student_id`, `message`, `status`, `created_at`) VALUES
(1, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 09:27:19'),
(2, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 09:27:19'),
(3, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 09:45:21'),
(4, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 09:45:21'),
(5, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:24:57'),
(6, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:24:57'),
(7, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:03'),
(8, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:03'),
(9, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:13'),
(10, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:13'),
(11, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:16'),
(12, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:16'),
(13, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:17'),
(14, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:17'),
(15, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:25'),
(16, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:25'),
(17, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:33'),
(18, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:33'),
(19, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:46'),
(20, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:46'),
(21, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:50'),
(22, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:50'),
(23, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:51'),
(24, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:51'),
(25, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:52'),
(26, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:52'),
(27, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:54'),
(28, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:54'),
(29, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:56'),
(30, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:25:56'),
(31, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:26:06'),
(32, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:26:06'),
(33, 2, 'Your tuition fee of $1200 is due. Please pay by Wed Jan 08 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:26:12'),
(34, 5, 'Your tuition fee of $1800 is due. Please pay by Sun Jan 19 2025 00:00:00 GMT+0300 (Arabian Standard Time).', 'unread', '2025-02-15 10:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `roll_number` varchar(20) NOT NULL,
  `class` varchar(10) NOT NULL,
  `parent_contact` varchar(15) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `roll_number`, `class`, `parent_contact`, `email`) VALUES
(1, 'anwar neja', '0149/14', '12', '0930836011', 'anwarnejanassir@gmail.com'),
(2, 'rawda Redi', 'n002', '10A', '0986543211', 'ilham@gmail.com'),
(3, 'Ikram Neja', 'v301', '10B', '0976543212', 'ikram@gmail.com'),
(4, 'Ayesha Siddiqui', 'h202', '10B', '0976543213', 'anwarneja55@gmail.com'),
(5, 'Ibrahim Sheikh', 'r001', '10C', '0987543214', 'ibrahim@gmail.com'),
(6, 'Zainab Ahmd', 'f002', '10C', '0987543215', 'zainab@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher','student') DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`) VALUES
(18, 'admin', 'admin@gmail.com', '$2b$10$oXckCocwWRs6GnAvskgwWe7J5LZvLxEAn73zLI6wA.XLzqV3EKKai', 'admin'),
(19, 'abdu', 'abdu@gmail.com', '$2b$10$plapAeS0PspRhNqV72Y8Iu.1/VI4oktGUxbF6lXba/Py.DOUCjD1e', 'student'),
(27, 'zehrya abdo', 'zehrya33@gmail.com', 'zehrya', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`fee_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `roll_number` (`roll_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `fees`
--
ALTER TABLE `fees`
  MODIFY `fee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
