-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 28, 2018 at 09:42 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mousa_net`
--

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `IID` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `quantity` int(5) NOT NULL,
  `price` int(7) NOT NULL,
  `bar_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `card_company` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_offers` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

DROP TABLE IF EXISTS `subscriber`;
CREATE TABLE IF NOT EXISTS `subscriber` (
  `SBID` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile` int(7) DEFAULT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`SBID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_detail`
--

DROP TABLE IF EXISTS `subscriber_detail`;
CREATE TABLE IF NOT EXISTS `subscriber_detail` (
  `SBDID` int(8) NOT NULL AUTO_INCREMENT,
  `SBID` int(5) NOT NULL,
  `sub_date` date DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  `profile` int(7) DEFAULT NULL,
  PRIMARY KEY (`SBDID`),
  KEY `SBID` (`SBID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subscriber_detail`
--
ALTER TABLE `subscriber_detail`
  ADD CONSTRAINT `subscriber_detail_ibfk_1` FOREIGN KEY (`SBID`) REFERENCES `subscriber` (`SBID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
