--
-- CreateDatabase
--
CREATE DATABASE IF NOT EXISTS `examen_fedediaz`;

USE `examen_fedediaz`;

--
-- CreateTable modalities
--
CREATE TABLE IF NOT EXISTS `modalities` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- InsertInto modalities
--
INSERT INTO
  `modalities` (`description`)
VALUES
  ('Group Course'),
  ('Individual Course');

-- --------------------------------------------------------
--
-- CreateTable courses
--
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `legajo` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(200) NOT NULL,
  `modality_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`modality_id`) REFERENCES modalities(id) ON DELETE CASCADE
);

--
-- InsertInto courses
--
INSERT INTO
  `courses` (`legajo`, `name`, `description`, `modality_id`)
VALUES
  (
    '4920',
    'Modern React with Redux [2023 Update]',
    'Master React and Redux Toolkit. Includes RTK Query, tons of custom hooks, and more! Course 100% Updated November 2022',
    1
  ),
  (
    '2418',
    'React - The Complete Guide (incl Hooks, React Router, Redux)',
    'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    1
  ),
  (
    '142',
    '100 Days of Code: The Complete Python Pro Bootcamp for 2023',
    'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
    1
  ),
  (
    '2635',
    'Complete Python Developer in 2023: Zero to Mastery',
    'How to become a Python 3 Developer and get hired! Build 12+ projects, learn Web Development, Machine Learning + more!',
    2
  ),
  (
    '643',
    'Complete C# Masterclass',
    'Learn C# Programming - WPF, Databases, Linq, Collections, Game Development with Unity. More than just the C# basics!',
    2
  ),
  (
    '725',
    'C# 10 | Ultimate Guide - Beginner to Advanced | Master class',
    'Learn C# by doing | C# projects | Bootcamp for C# Interview | Advanced C# | Collections | LINQ | Interview Questions',
    2
  );

-- --------------------------------------------------------
--
-- CreateTable users
--
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `dni` INT NOT NULL UNIQUE,
  `gender` VARCHAR(1) NOT NULL,
  `age` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- InsertInto users
--
INSERT INTO
  `users` (`name`, `surname`, `dni`, `gender`, `age`)
VALUES
  ('Federico', 'Diaz Aimar', '41092045', 'M', 24),
  (
    'Norberto Nazarino',
    'Traman',
    '17171752',
    'M',
    32
  ),
  ('Raquel Andrea', 'Perez', '31007152', 'F', 25),
  ('Mia Agustina', 'Gomez', '41148624', 'F', 27);

-- --------------------------------------------------------
--
-- CreateTable inscriptions
--
CREATE TABLE IF NOT EXISTS `inscriptions` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `course_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users(id) ON DELETE CASCADE
);

--
-- InsertInto inscriptions
--
INSERT INTO
  `inscriptions` (`course_id`, `user_id`)
VALUES
  (2, 1);