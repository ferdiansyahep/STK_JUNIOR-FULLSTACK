CREATE DATABASE IF NOT EXISTS stk_db;
USE stk_db;

CREATE TABLE `menus` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parentId` varchar(255) DEFAULT NULL,
  `depth` int NOT NULL DEFAULT '0',
  `orderIndex` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;