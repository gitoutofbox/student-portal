-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2018 at 10:49 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `sp_emails`
--

CREATE TABLE `sp_emails` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sp_emails`
--

INSERT INTO `sp_emails` (`id`, `name`, `email`, `created_on`, `updated_on`) VALUES
(1, 'souravd', 'sourav@gmaill.com', '2018-05-05 15:33:53', '2018-05-03 08:18:58'),
(2, 'estT', 'TES@dd.ddd', '2018-05-05 09:21:01', '2018-05-05 14:51:01'),
(3, 'Name1.1', 'email1@gmail.com', '2018-05-05 15:37:08', '2018-05-05 21:06:38'),
(4, 'sdasd2', 'ddss@ddd.ffofm', '2018-05-05 15:48:43', '2018-05-05 21:18:43'),
(5, 'Name3', 'email22@ga.com', '2018-05-05 15:54:35', '2018-05-05 21:24:35');

-- --------------------------------------------------------

--
-- Table structure for table `sp_emails_groups`
--

CREATE TABLE `sp_emails_groups` (
  `id` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sp_emails_groups`
--

INSERT INTO `sp_emails_groups` (`id`, `email_id`, `group_id`, `created_on`, `updated_on`) VALUES
(1, 1, 1, '2018-05-08 19:30:43', '2018-05-08 19:30:43'),
(2, 4, 1, '2018-05-08 20:47:32', '2018-05-08 20:47:32'),
(3, 3, 1, '2018-05-08 20:48:36', '2018-05-08 20:48:36');

-- --------------------------------------------------------

--
-- Table structure for table `sp_groups`
--

CREATE TABLE `sp_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sp_groups`
--

INSERT INTO `sp_groups` (`id`, `name`, `created_on`, `updated_on`) VALUES
(1, 'My Group 1.1', '2018-05-08 19:22:32', '2018-05-07 03:25:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sp_emails`
--
ALTER TABLE `sp_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sp_emails_groups`
--
ALTER TABLE `sp_emails_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sp_groups`
--
ALTER TABLE `sp_groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sp_emails`
--
ALTER TABLE `sp_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `sp_emails_groups`
--
ALTER TABLE `sp_emails_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `sp_groups`
--
ALTER TABLE `sp_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
