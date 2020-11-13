CREATE DATABASE smartIndustry;

USE smartIndustry;

CREATE TABLE `people` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`apppassword` varchar(255) default NULL,
	`card` varchar(255) default NULL,
	`role` varchar(255) NOT NULL,
	`visible` bit(1) NOT NULL,
	`image` mediumblob default NULL,
	KEY `people_card_inx` ( `card` ),
	KEY `people_fk_1` ( `role` ),
	UNIQUE INDEX `people_name_inx` ( `name` ),
	PRIMARY KEY  ( `id` )
) ENGINE = InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT = Compact;

CREATE TABLE `pickup_number` (
	`id` int(11) NOT NULL default '0'
) ENGINE = InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT = Compact;

-- ADD people
INSERT INTO people(id, name, apppassword, visible, image) VALUES ('0', 'adm', '$2a$10$UB6bY4tBPmWLy6unp8pdqeN9yT9X5DQ2vbU.ASd4wCYzBzwbDzvfu', TRUE, NULL);
INSERT INTO people(id, name, apppassword, visible, image) VALUES ('1', 'gerente', '$2a$10$UB6bY4tBPmWLy6unp8pdqeN9yT9X5DQ2vbU.ASd4wCYzBzwbDzvfu', TRUE, NULL);
INSERT INTO people(id, name, apppassword, visible, image) VALUES ('2', 'vendedor', '$2a$10$UB6bY4tBPmWLy6unp8pdqeN9yT9X5DQ2vbU.ASd4wCYzBzwbDzvfu', TRUE, NULL);