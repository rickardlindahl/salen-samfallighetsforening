CREATE TABLE `document` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`size` int NOT NULL,
	`url` text NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp);
