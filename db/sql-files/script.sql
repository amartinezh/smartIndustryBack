CREATE DATABASE smartIndustry;

USE smartIndustry;

CREATE TABLE Usuario (
    id_usuario CHARACTER VARYING(40)  NOT NULL,
    nombre_u CHARACTER VARYING(40)  NOT NULL,
    cargo_u CHARACTER VARYING(40)  NOT NULL,
    CONSTRAINT PK_Usuario PRIMARY KEY (id_usuario)); 


CREATE TABLE Carga (
    id_usuario CHARACTER VARYING(40)  NOT NULL,
    id_archivo CHARACTER VARYING(40)  NOT NULL,
    fecha_carga DATE  NOT NULL,
    id_registro CHARACTER VARYING(40)  NOT NULL,
    id_maquina CHARACTER VARYING(40)  NOT NULL,
    CONSTRAINT PK_Carga PRIMARY KEY (id_usuario, id_archivo, id_registro, id_maquina));



ALTER TABLE Carga ADD CONSTRAINT Usuario_Carga 
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario);
ALTER TABLE Carga ADD CONSTRAINT Archivo_Carga 
    FOREIGN KEY (id_archivo) REFERENCES Archivo (id_archivo);      


CREATE TABLE Archivo (
    id_archivo CHARACTER VARYING(40)  NOT NULL,
    fecha_creacion DATE  NOT NULL,
    descripcion CHARACTER VARYING(200),
    CONSTRAINT PK_Archivo PRIMARY KEY (id_archivo));

CREATE TABLE Registro (
    id_registro CHARACTER VARYING(40)  NOT NULL,
    fecha_registro DATE  NOT NULL,
    potencia CHARACTER VARYING(40)  NOT NULL,
    rendimiento CHARACTER VARYING(40)  NOT NULL,
    consumo CHARACTER VARYING(40)  NOT NULL,
    id_maquina INTEGER  NOT NULL,
    id_archivo INTEGER  NOT NULL,
    CONSTRAINT PK_Registro PRIMARY KEY (id_registro, id_maquina, id_archivo));

ALTER TABLE Registro ADD CONSTRAINT Maquina_Registro 
    FOREIGN KEY (id_maquina) REFERENCES Maquina (id_maquina);
ALTER TABLE Registro ADD CONSTRAINT Archivo_Registro 
    FOREIGN KEY (id_archivo) REFERENCES Archivo (id_archivo);         



CREATE TABLE Maquina (
    id_maquina CHARACTER VARYING(40)  NOT NULL,
    modelo_maquina CHARACTER VARYING(50)  NOT NULL,
    tipo_maquina CHARACTER VARYING(50)  NOT NULL,
    CONSTRAINT PK_Maquina PRIMARY KEY (id_maquina));  


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