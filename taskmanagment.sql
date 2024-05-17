-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 30, 2024 at 05:51 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskmanagment`
--

-- --------------------------------------------------------

--
-- Table structure for table `priorities`
--

DROP TABLE IF EXISTS `priorities`;
CREATE TABLE IF NOT EXISTS `priorities` (
  `priority_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `priority_name` varchar(255) NOT NULL,
  PRIMARY KEY (`priority_id`),
  UNIQUE KEY `priority_id` (`priority_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `priorities`
--

INSERT INTO `priorities` (`priority_id`, `priority_name`) VALUES
(1, 'Low'),
(2, 'Medium'),
(3, 'High');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `roleName`, `user_id`) VALUES
(1, 'Assignee', 7),
(2, 'user', 8),
(3, 'user', 9),
(4, 'admin', 10),
(5, 'assigner', 11);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE IF NOT EXISTS `statuses` (
  `status_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `status_id` (`status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`status_id`, `status_name`) VALUES
(1, 'Upcoming'),
(2, 'InProgress'),
(3, 'InTesting'),
(4, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `assignee_id` int DEFAULT NULL,
  `priority_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `execution_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `task_id` (`task_id`),
  KEY `fk_assigned_by` (`assigned_by_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `title`, `description`, `assignee_id`, `priority_id`, `status_id`, `due_date`, `execution_date`, `created_at`, `assigned_by_id`) VALUES
(6, 'Implement search feature', 'Add search functionality to the application to allow users to easily find content.', 3, 3, 1, '2024-05-25', '2024-05-22', '2024-04-24 10:30:52', 1),
(5, 'Update user profile UI', 'Enhance the user profile page with new design elements and improve user experience.', 2, 1, 3, '2024-05-20', '2024-05-18', '2024-04-24 10:30:52', 2),
(4, 'Fix bug in login module', 'The login functionality is not working properly. Investigate and fix the issue.', 1, 2, 2, '2024-05-15', '2024-05-10', '2024-04-24 10:30:52', 4),
(7, 'web design', 'design a dashboard', 1, 3, 2, '2024-05-30', '2024-05-05', '2024-04-26 03:01:02', 11),
(1, 'Develop API Endpoints', 'Create and document all needed API endpoints for the new module.', 2, 3, 1, '2024-05-10', '2024-05-08', '2024-04-24 04:30:00', 1),
(2, 'Create User Documentation', 'Write comprehensive user documentation for the new software release.', 4, 2, 3, '2024-05-18', '2024-05-15', '2024-04-24 04:45:00', 2),
(3, 'Test Payment Integration', 'Perform thorough testing of the new payment integration module.', 1, 1, 2, '2024-05-22', '2024-05-20', '2024-04-24 05:00:00', 3),
(8, 'Refactor Codebase', 'Optimize existing code for better performance.', 4, 2, 1, '2024-06-01', '2024-05-28', '2024-04-26 04:30:00', 3),
(9, 'Optimize Database', 'Review and optimize database queries for efficiency.', 5, 1, 2, '2024-06-05', '2024-06-02', '2024-04-26 04:45:00', 3),
(10, 'Update Login Flow', 'Enhance the login flow to include two-factor authentication.', 2, 3, 1, '2024-06-10', '2024-06-07', '2024-04-26 05:00:00', 1),
(11, 'Add Notification System', 'Implement a real-time notification system for users.', 1, 1, 3, '2024-06-15', '2024-06-12', '2024-04-26 05:15:00', 4),
(12, 'Improve Security Measures', 'Update security protocols to latest standards.', 3, 2, 2, '2024-06-20', '2024-06-17', '2024-04-26 05:30:00', 2),
(13, 'template design ', 'design a template for a social media post', 1, 3, 4, '2024-04-19', '2024-02-05', '2024-04-26 05:34:50', 11),
(14, 'ss', 'saf', 1, 2, NULL, '2024-04-30', '2024-04-03', '2024-04-29 05:19:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userRole` enum('Assigner','Assignee') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `Name`, `email`, `password`, `userRole`, `profilePic`) VALUES
(1, 'hardik', 'harshkariya1@gmail.com', '$2b$10$zvaC6uu9.ydZckTrwM40aO.QsmJwJs1J5FO7reb9CXUumkOeO4196', 'Assigner', '7d411acfb9202193-boy-2178303__340.jpg'),
(2, 'harsh', 'harsh11@gmail.com', '$2b$10$ER1gaa0vMxzFoLDpZymRUupv9F81.rljoBe8r6LD.iJLLuxUqxhra', 'Assignee', '405c717dd1051562-boy-2178303__340.jpg'),
(3, 'dhruvin', 'harsh1@gmail.com', '$2b$10$dnNpP9UdSJw.Y5Ndyn4Ks.p9xiITmzz5/qod3qLqlUqceZrw/C7IK', 'Assignee', 'd975c783ade853a1-boy-2178303__340.jpg'),
(4, 'keval', 'harsh1231@gmail.com', '$2b$10$QuiaZnm0jqvgprIJUY4sy.DAa0RfDOu5L89EZ37vx6gigbbyLn8xq', 'Assigner', '659bf326e490604f-boy-2178303__340.jpg'),
(6, 'yash', 'harsh111@gmail.com', '$2b$10$dnNpP9UdSJw.Y5Ndyn4Ks.p9xiITmzz5/qod3qLqlUqceZrw/C7IK', 'Assigner', 'd975c783ade853a1-boy-2178303__340.jpg'),
(7, 'harsh kariya', 'harshkariya111@gmail.com', '$2b$10$cgqSdJeR3wLWKrDqw7d9merHmKiY6j/hdT1gpwBDu2VK2/xMpJQ9i', 'Assignee', '4d4d75baeb08984e-boy-2178303__340.jpg'),
(8, 'kunal bhattla', 'kunal@gmail.com', '$2b$10$l9dMqE0c5o9RidmTSUb9ze3yJlviLUW4UrWXc2RM1OrrqEuRIaxpC', 'Assigner', '7c68753219b6d856-boy-2178303__340.jpg'),
(9, 'pankaj tripathi', 'pankaj@gmail.com', '$2b$10$uU2VtVf0ZdCEHbtk4bAzhOoQWzqbpaSvEWDirz.79NtpQ9qDDyaKO', 'Assigner', 'bb1153add695ed5c-free-photo-of-people-in-park.jpeg'),
(10, 'pruthvi chauhan', 'pruthvi11@gmail.com', '$2b$10$2qJcg//lG6jrFp9xSUeGtuYfqVNmJZU3gqMVdZ5qi77NQM4jdHdo2', 'Assignee', '500ab10ae7aee6d4-free-photo-of-people-in-park.jpeg'),
(11, 'dinky jani', 'dinky@gmail.com', '$2b$10$TMosp71N9tPsBw62.he/Tu1VgSEGehr/9FZbtZegrhZ.MCOeyM9YC', 'Assigner', 'a1dbf31fbb2f726b-free-photo-of-people-in-park.jpeg');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
