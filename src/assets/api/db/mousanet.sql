-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 07, 2018 at 11:13 AM
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
-- Database: `mousanet`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
CREATE TABLE IF NOT EXISTS `accessories` (
  `IID` int(5) NOT NULL,
  `cost` int(7) DEFAULT NULL,
  `price` int(7) DEFAULT NULL,
  `quantity` int(5) DEFAULT NULL,
  KEY `IID` (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
CREATE TABLE IF NOT EXISTS `credit` (
  `IID` int(5) NOT NULL AUTO_INCREMENT,
  `quantity` int(5) NOT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `drawer`
--

DROP TABLE IF EXISTS `drawer`;
CREATE TABLE IF NOT EXISTS `drawer` (
  `date` date NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `profit` int(7) DEFAULT NULL,
  `type` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE IF NOT EXISTS `invoice` (
  `INVID` int(8) NOT NULL AUTO_INCREMENT,
  `PID` int(5) NOT NULL,
  `IID` int(5) NOT NULL,
  `country` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `quantity` int(7) DEFAULT NULL,
  `price` int(7) DEFAULT NULL,
  `profit` int(7) DEFAULT NULL,
  `type` varchar(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`INVID`),
  KEY `PID` (`PID`),
  KEY `IID` (`IID`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`INVID`, `PID`, `IID`, `country`, `date`, `quantity`, `price`, `profit`, `type`) VALUES
(35, 3, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(36, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(37, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(38, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(39, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(40, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(41, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(42, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(43, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(44, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'SL'),
(45, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(46, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(47, 6, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(48, 6, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(49, 6, 32, NULL, NULL, 1, 500, NULL, 'AC'),
(50, 6, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(51, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(52, 3, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(54, 1, 1, 'Lebanon', '2018-09-05', 5, 5, NULL, 'CE'),
(55, 1, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(56, 1, 1, 'Lebanon', '2018-09-05', 5, 5, NULL, 'CE'),
(57, 1, 1, 'Lebanon', '2018-09-05', 5, 5, NULL, 'CE'),
(58, 1, 1, 'Lebanon', '2018-09-05', 5, 5, NULL, 'CE'),
(59, 6, 32, NULL, '2018-09-05', 1, 500, NULL, 'AC'),
(60, 1, 1, 'Syrian Arab Republic', '2018-09-05', 5, 2, NULL, 'CE'),
(61, 1, 1, 'Kuwait', '2018-09-05', 5, 5, NULL, 'CE'),
(62, 1, 1, 'Lebanon', '2018-09-05', 5, 5, NULL, 'CE'),
(63, 1, 1, 'Syrian Arab Republic', '2018-09-05', 5, 5, NULL, 'CE'),
(64, 1, 1, '', '2018-09-05', 0, 0, NULL, 'CE'),
(65, 1, 1, 'Lebanon', '2018-09-06', 1, 1, NULL, 'CE'),
(69, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(70, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(72, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(73, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(77, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(78, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(81, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(82, 3, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(83, 1, 1, 'Lebanon', '2018-09-06', 5, 5, NULL, 'CE'),
(84, 1, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(85, 1, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(86, 1, 31, NULL, '2018-09-06', 1, 8000, NULL, 'AC'),
(87, 1, 27, NULL, '2018-09-06', 1, NULL, NULL, 'CT'),
(88, 1, 27, NULL, '2018-09-06', 1, NULL, NULL, 'CT');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_central`
--

DROP TABLE IF EXISTS `invoice_central`;
CREATE TABLE IF NOT EXISTS `invoice_central` (
  `INVCID` int(8) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `duration` int(3) NOT NULL,
  `country` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(7) NOT NULL,
  PRIMARY KEY (`INVCID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `IID` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(7) DEFAULT NULL,
  `bar_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`IID`, `name`, `type`, `price`, `bar_code`) VALUES
(1, 'CENTRAL', 'CE', NULL, NULL),
(25, '22$', 'RC', 40000, '1236'),
(26, '2$ + 30 Days', 'RC', 20000, '456'),
(27, NULL, 'CT', NULL, '7425'),
(28, NULL, 'CT', NULL, '7428'),
(29, 'item 1', 'AC', 22000, '4525'),
(30, 'item 2', 'AC', 1000, '8987'),
(31, 'acc 3', 'AC', 8000, '64'),
(32, 'chokolatino', 'AC', 500, '5285006180580A');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
CREATE TABLE IF NOT EXISTS `offers` (
  `IID` int(5) NOT NULL,
  `company` varchar(4) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_of_mounth` int(4) DEFAULT NULL,
  `num_of_credit` int(3) DEFAULT NULL,
  `price` int(7) DEFAULT NULL,
  PRIMARY KEY (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

DROP TABLE IF EXISTS `operation`;
CREATE TABLE IF NOT EXISTS `operation` (
  `OID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `note` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `op_type` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dra_type` varchar(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`OID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE IF NOT EXISTS `person` (
  `PID` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_client` tinyint(1) DEFAULT '1',
  `sup_type` bit(1) DEFAULT NULL,
  `debit` int(7) DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`PID`, `name`, `phone`, `address`, `is_client`, `sup_type`, `debit`) VALUES
(1, '---', '787', 'mlm', 1, NULL, NULL),
(2, 'jjj', '787', 'lmlm', 0, NULL, NULL),
(3, 'Haifaa', '15963', 'chaqraa', 1, NULL, 8500),
(4, 'op', '78', 'k', 1, NULL, NULL),
(5, 'ppp', '78', ',lmkm', 1, NULL, NULL),
(6, 'qwerty', '78465', 'dfv', 1, NULL, 500);

-- --------------------------------------------------------

--
-- Table structure for table `recharge_card`
--

DROP TABLE IF EXISTS `recharge_card`;
CREATE TABLE IF NOT EXISTS `recharge_card` (
  `IID` int(5) NOT NULL,
  `company` varchar(4) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(4) DEFAULT NULL,
  `cost` int(7) DEFAULT NULL,
  `price` int(7) DEFAULT NULL,
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
  `ip_address` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile` int(7) DEFAULT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`SBID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`SBID`, `name`, `phone`, `ip_address`, `address`, `profile`, `is_activated`) VALUES
(1, 'aaa', '777', 'bbb', 'ppp', 35, 0),
(2, 'ppp', '888', 'ppp', 'ppp', 50, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscriber_detail`
--

INSERT INTO `subscriber_detail` (`SBDID`, `SBID`, `sub_date`, `exp_date`, `payment_date`, `is_paid`, `profile`) VALUES
(1, 1, '2018-08-01', '2018-09-01', '2018-08-03', 0, 35),
(2, 2, NULL, NULL, '2018-08-30', 1, 50),
(3, 2, NULL, NULL, '2018-08-30', 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
CREATE TABLE IF NOT EXISTS `supply` (
  `SID` int(8) NOT NULL AUTO_INCREMENT,
  `SDID` int(5) NOT NULL,
  `IID` int(5) NOT NULL,
  `quantity` int(7) DEFAULT NULL,
  `cost` int(7) DEFAULT NULL,
  PRIMARY KEY (`SID`),
  KEY `SDID` (`SDID`),
  KEY `IID` (`IID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supply_detail`
--

DROP TABLE IF EXISTS `supply_detail`;
CREATE TABLE IF NOT EXISTS `supply_detail` (
  `SDID` int(5) NOT NULL AUTO_INCREMENT,
  `PID` int(5) NOT NULL,
  `sup_date` date DEFAULT NULL,
  `total_cost` int(10) DEFAULT NULL,
  `rest` int(10) DEFAULT NULL,
  `invoice_type` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`SDID`),
  KEY `PID` (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessories`
--
ALTER TABLE `accessories`
  ADD CONSTRAINT `accessories_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`);

--
-- Constraints for table `credit`
--
ALTER TABLE `credit`
  ADD CONSTRAINT `credit_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`),
  ADD CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`PID`) REFERENCES `person` (`PID`);

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`);

--
-- Constraints for table `subscriber_detail`
--
ALTER TABLE `subscriber_detail`
  ADD CONSTRAINT `subscriber_detail_ibfk_1` FOREIGN KEY (`SBID`) REFERENCES `subscriber` (`SBID`);

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`SDID`) REFERENCES `supply_detail` (`SDID`),
  ADD CONSTRAINT `supply_ibfk_2` FOREIGN KEY (`IID`) REFERENCES `item` (`IID`);

--
-- Constraints for table `supply_detail`
--
ALTER TABLE `supply_detail`
  ADD CONSTRAINT `supply_detail_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `person` (`PID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
