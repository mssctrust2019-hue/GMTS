-- ==============================================================================
-- GLOBAL MULTITALENT SHOW (GMTS) - OFFICIAL DATABASE SCHEMA (10 TABLES)
-- Compatible with: MySQL 5.7+ / MySQL 8.0+ / MariaDB / PHP MySQLi
-- Architecture: Multi-Round Online Talent Competition + MLM Binary System
-- Jurisdiction: Ahmedabad, Gujarat, India (Exclusively)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `gmts_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gmts_db`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `certificates`;
DROP TABLE IF EXISTS `bonus_income`;
DROP TABLE IF EXISTS `admin_settings`;
DROP TABLE IF EXISTS `rounds`;
DROP TABLE IF EXISTS `votes`;
DROP TABLE IF EXISTS `referrals`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `registrations`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. USERS TABLE
-- Stores contestants, MLM distributors, and master administrators
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_number` VARCHAR(50) NOT NULL UNIQUE, -- e.g. GMTSyymmdd001
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `mobile_number` VARCHAR(20) NOT NULL,
  `age` INT NOT NULL, -- 5 to 85 years
  `age_group` ENUM('Kids (5-12)', 'Teens (13-17)', 'Young Adult (18-35)', 'Adult (36-60)', 'Senior (61-85)') GENERATED ALWAYS AS (
    CASE 
      WHEN `age` BETWEEN 5 AND 12 THEN 'Kids (5-12)'
      WHEN `age` BETWEEN 13 AND 17 THEN 'Teens (13-17)'
      WHEN `age` BETWEEN 18 AND 35 THEN 'Young Adult (18-35)'
      WHEN `age` BETWEEN 36 AND 60 THEN 'Adult (36-60)'
      ELSE 'Senior (61-85)'
    END
  ) STORED,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `address` TEXT,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL DEFAULT 'Gujarat',
  `country` VARCHAR(100) NOT NULL DEFAULT 'India',
  `password` VARCHAR(255) NOT NULL, -- Encrypted / BCRYPT Hash
  `profile_image` VARCHAR(255) DEFAULT NULL,
  `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  
  -- MLM Binary Integration Fields
  `sponsor_id` VARCHAR(50) DEFAULT NULL, -- Sponsor's registration_number
  `placement_side` ENUM('L', 'R') NOT NULL DEFAULT 'L', -- Left or Right Leg
  `purchase_code` VARCHAR(50) NOT NULL UNIQUE,
  `role` ENUM('contestant', 'distributor', 'admin') NOT NULL DEFAULT 'distributor',
  `rank` ENUM('Distributor', 'Silver', 'Gold', 'Ruby', 'Diamond') NOT NULL DEFAULT 'Silver',
  `self_pv` INT NOT NULL DEFAULT 250,
  `left_pv` INT NOT NULL DEFAULT 0,
  `right_pv` INT NOT NULL DEFAULT 0,
  `carry_left_pv` INT NOT NULL DEFAULT 0,
  `carry_right_pv` INT NOT NULL DEFAULT 0,
  `wallet_balance` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `total_earned` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  
  INDEX `idx_users_reg_no` (`registration_number`),
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_sponsor` (`sponsor_id`),
  INDEX `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. REGISTRATIONS TABLE
-- Tracks participant entry, video audition link, review status, and round
-- ------------------------------------------------------------------------------
CREATE TABLE `registrations` (
  `registration_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `selected_category` VARCHAR(150) NOT NULL,
  `youtube_video_link` VARCHAR(255) NOT NULL,
  `youtube_embed_id` VARCHAR(50) DEFAULT NULL,
  `video_status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
  `registration_fee_paid` DECIMAL(10,2) NOT NULL DEFAULT 1500.00,
  `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `current_round` ENUM('1', '2', '3', 'Semi-Final', 'Final') NOT NULL DEFAULT '1',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_reg_user` (`user_id`),
  INDEX `idx_reg_status` (`video_status`),
  INDEX `idx_reg_round` (`current_round`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. CATEGORIES TABLE
-- 200+ talent categories across 10 grand artistic divisions
-- ------------------------------------------------------------------------------
CREATE TABLE `categories` (
  `category_id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(150) NOT NULL,
  `category_type` VARCHAR(100) NOT NULL, -- Dance, Singing, Modeling, Acting, etc.
  `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  INDEX `idx_cat_type` (`category_type`),
  INDEX `idx_cat_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. PAYMENTS TABLE
-- Razorpay payment transactions with order IDs and verification
-- ------------------------------------------------------------------------------
CREATE TABLE `payments` (
  `payment_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `razorpay_order_id` VARCHAR(100) NOT NULL,
  `razorpay_payment_id` VARCHAR(100) DEFAULT NULL,
  `amount` DECIMAL(10,2) NOT NULL, -- e.g. 600.00 / 1500.00 INR
  `payment_status` ENUM('Success', 'Failed', 'Pending') NOT NULL DEFAULT 'Pending',
  `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `receipt_url` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_pay_user` (`user_id`),
  INDEX `idx_pay_order` (`razorpay_order_id`),
  INDEX `idx_pay_status` (`payment_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. REFERRALS TABLE
-- Multi-level binary tree referrals with Left/Right positioning (Levels 1 to 20)
-- ------------------------------------------------------------------------------
CREATE TABLE `referrals` (
  `referral_id` INT AUTO_INCREMENT PRIMARY KEY,
  `referrer_user_id` INT NOT NULL, -- Sponsor / Upline
  `referred_user_id` INT NOT NULL, -- Downline
  `referral_side` ENUM('L', 'R') NOT NULL, -- Left (L) or Right (R) binary placement
  `referral_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `level_number` INT NOT NULL DEFAULT 1, -- Level 1 to 20
  FOREIGN KEY (`referrer_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`referred_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_ref_sponsor` (`referrer_user_id`),
  INDEX `idx_ref_downline` (`referred_user_id`),
  INDEX `idx_ref_level` (`level_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. VOTES TABLE
-- Audience public votes with IP address & OTP verification (1 vote / 24 hrs rule)
-- ------------------------------------------------------------------------------
CREATE TABLE `votes` (
  `vote_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `voter_ip_address` VARCHAR(50) NOT NULL,
  `voted_user_id` INT NOT NULL,
  `voter_email` VARCHAR(150) DEFAULT NULL,
  `vote_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `otp_verified` TINYINT(1) NOT NULL DEFAULT 1,
  `vote_source` ENUM('Direct', 'Referral') NOT NULL DEFAULT 'Direct',
  FOREIGN KEY (`voted_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_vote_target` (`voted_user_id`),
  INDEX `idx_vote_ip_time` (`voter_ip_address`, `vote_date`),
  INDEX `idx_vote_email_time` (`voter_email`, `vote_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. ROUNDS TABLE
-- Multi-round progression tracking (Round 1, 2, 3, Semi-Final, Final)
-- ------------------------------------------------------------------------------
CREATE TABLE `rounds` (
  `round_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `round_number` ENUM('1', '2', '3', 'Semi-Final', 'Final') NOT NULL DEFAULT '1',
  `referral_count` INT NOT NULL DEFAULT 0,
  `vote_count` INT NOT NULL DEFAULT 0,
  `qualification_status` ENUM('Qualified', 'Not Qualified') NOT NULL DEFAULT 'Not Qualified',
  `round_completion_date` DATETIME DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_rounds_user` (`user_id`),
  INDEX `idx_rounds_status` (`qualification_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. ADMIN_SETTINGS TABLE
-- System configuration (Points conversion, round criteria, reward pools)
-- ------------------------------------------------------------------------------
CREATE TABLE `admin_settings` (
  `setting_id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_name` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. BONUS_INCOME TABLE
-- Commission ledger (Binary Matching, Generation, Royalty Pool, Retail Profit)
-- ------------------------------------------------------------------------------
CREATE TABLE `bonus_income` (
  `income_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `income_type` ENUM('Matching Bonus', 'Generation Bonus', 'Royalty', 'Retail Profit') NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `calculation_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Paid', 'Pending') NOT NULL DEFAULT 'Paid',
  `pv_volume` INT DEFAULT 0,
  `reference_id` VARCHAR(100) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_income_user` (`user_id`),
  INDEX `idx_income_type` (`income_type`),
  INDEX `idx_income_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. CERTIFICATES TABLE
-- Official accredited milestone certificates with QR token verification
-- ------------------------------------------------------------------------------
CREATE TABLE `certificates` (
  `certificate_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `certificate_type` VARCHAR(100) NOT NULL, -- Round Completion, Achievement, Grand Finalist
  `certificate_url` VARCHAR(255) DEFAULT NULL,
  `issue_date` VARCHAR(50) NOT NULL,
  `unique_certificate_number` VARCHAR(100) NOT NULL UNIQUE, -- e.g. GMTS-CERT-REG-001
  `qr_token` VARCHAR(100) NOT NULL UNIQUE,
  `signatory` VARCHAR(150) NOT NULL DEFAULT 'Dr. V. K. Desai, Director VIFTRI & GMTS',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  INDEX `idx_cert_user` (`user_id`),
  INDEX `idx_cert_no` (`unique_certificate_number`),
  INDEX `idx_cert_qr` (`qr_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Admin Settings
INSERT INTO `admin_settings` (`setting_name`, `setting_value`, `description`) VALUES
('binary_matching_rate_inr', '0.90', 'Payout per 1 matched Point Value (PV)'),
('round1_referrals_required', '100', 'Referrals needed to qualify Round 1'),
('round1_votes_required', '250', 'Audience votes needed to qualify Round 1'),
('grand_final_prize_inr', '100000', 'Cash Puraskar for Round 5 Grand Finalist'),
('royalty_pool_percentage', '3.00', 'Company turnover distributed among Diamond rank distributors'),
('ahmedabad_office_address', '24-1st Floor, Sharda Shopping Center, Rabari Colony, Ahmedabad, Gujarat 380026', 'Corporate Headquarters'),
('support_helpline_mobile', '+91 9157697394', 'Direct Contact & WhatsApp Helpline');

-- Seed Standard Talent Categories
INSERT INTO `categories` (`category_name`, `category_type`, `status`) VALUES
-- Modeling & Catwalk Runway
('Catwalk Professional', 'Modeling', 'Active'),
('Designer Show Walk', 'Modeling', 'Active'),
('Ramp Personality Walk', 'Modeling', 'Active'),
('Bridal & Ethnic Haute Couture', 'Modeling', 'Active'),
('Kids & Teens Fashion Runway', 'Modeling', 'Active'),
('Commercial Print & Glamour Look', 'Modeling', 'Active'),

-- Dancing & Choreography
('Contemporary & Freestyle', 'Dance', 'Active'),
('Classical Bharatnatyam & Kathak', 'Dance', 'Active'),
('Bollywood & Folk Garba Fusion', 'Dance', 'Active'),
('Hip-Hop, Breaking & Popping', 'Dance', 'Active'),
('Duet & Group Choreography', 'Dance', 'Active'),

-- Singing & Vocals
('Solo Bollywood Playback', 'Singing', 'Active'),
('Indian Classical & Semi-Classical', 'Singing', 'Active'),
('Sufi, Ghazal & Devotional Bhajans', 'Singing', 'Active'),
('Rap, Rhythm & Indie Vocals', 'Singing', 'Active'),
('Acoustic Western Vocals', 'Singing', 'Active'),

-- Acting & Theatre
('Monologue & Soliloquy', 'Acting', 'Active'),
('Short Film & Web Series Screenplay', 'Acting', 'Active'),
('Theatrical Street Drama & Mime', 'Acting', 'Active'),
('Mimicry & Voice Over Dubbing', 'Acting', 'Active'),

-- Special Talents & Arts
('Stand-up Comedy & Satire', 'Comedy', 'Active'),
('Stage Illusion & Sleight of Hand Magic', 'Magic', 'Active'),
('Fine Art, Speed Painting & Calligraphy', 'Art', 'Active'),
('Acoustic Guitar, Piano & Flute', 'Instruments', 'Active'),
('Martial Arts Forms & Yoga Asanas', 'Special', 'Active');
