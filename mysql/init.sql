
CREATE DATABASE cms;

USE cms;


CREATE TABLE `navbar` (
  `id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `href` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `navbar` (`id`, `text`, `href`) VALUES
(1, 'Impressum', '/impressum'),
(2, 'Startseite', '/'),
(3, 'Seitentitel', '/beispiel');

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pages` (`id`, `title`, `url`) VALUES
(1, 'Impressum', '\/impressum'),
(2, 'Startseite', ''),
(3, 'Beispielseite', '\/beispiel');

CREATE TABLE `page_content` (
  `id` int(11) NOT NULL,
  `page_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `page_content` (`id`, `page_id`, `order`, `content`, `type`) VALUES
(1, 1, 0, 'Beispielhaftes Impressum des CMS', 'text'),
(2, 2, 0, 'Dies ist die Startseite des CMS', 'text'),
(3, 3, 0, 'Dies ist eine Beispielseite des CMS', 'text');


CREATE TABLE `settings` (
  `key` varchar(255) NOT NULL,
  `value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `settings` (`key`, `value`) VALUES
('footer', '<p>Beispiel Footer</p>'),
('headerHeading', 'Beispiel CMS'),
('headerSubHeading', 'Demonstration des CMS'),
('theme', 'BaseTheme');

CREATE TABLE `sidebar` (
  `id` int(11) NOT NULL,
  `heading` text DEFAULT NULL,
  `content` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `sidebar` (`id`, `heading`, `content`) VALUES
(51, 'Über das CMS', 'Das CMS dient der Verwaltung einer Website');

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `page_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `stats` (`id`, `date`, `page_id`, `count`) VALUES
(5, '2022-04-09', 6, 2),
(7, '2022-04-11', 1, 4);

ALTER TABLE `navbar`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `page_content`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `settings`
  ADD PRIMARY KEY (`key`);

ALTER TABLE `sidebar`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `navbar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `page_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

ALTER TABLE `sidebar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
