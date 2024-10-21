CREATE TABLE sector
(
	id int primary key not null identity,
	name varchar(50) not null
);

go

CREATE TABLE occupation_area
(
	id int primary key not null identity,
	name varchar(50) not null
);

go

CREATE TABLE position
(
	id int primary key not null identity,
	name varchar(255) not null,
	id_sector int not null foreign key references sector(id),
	id_occupation_area int not null foreign key references occupation_area(id)
);

go

CREATE TABLE users
(
	id int primary key not null identity,
	name varchar(255) not null,
	identification int,
	hash varchar(max) not null,
	birthday date,
	id_position int not null foreign key references position(id),
	is_actived bit not null
);

go

CREATE TABLE course
(
	id int primary key not null identity,
	name varchar(255) not null,
	abbreviation varchar(20) not null
);

go

CREATE TABLE class
(
	id int primary key not null identity,
	name varchar(255) not null,
	abbreviation varchar(30) not null,
	id_course int not null foreign key references course(id)
);

go

CREATE TABLE student
(
	id int primary key not null identity,
	id_user int not null foreign key references users(id),
	id_class int not null foreign key references class(id),
	grade float
);

go

CREATE TABLE personal_feedback
(
	id int primary key not null identity,
	date date not null,
	feedback varchar(255) not null,
	id_student int not null foreign key references student(id),
	id_instructor int not null foreign key references users(id)
);

go

CREATE TABLE competence
(
	id int primary key not null identity,
	competence varchar(255) not null
);

go

CREATE TABLE result
(
	id int primary key not null identity,
	result varchar(20) not null,
	feedback_student varchar(255),
	id_student int not null foreign key references student(id),
	id_competence int not null foreign key references competence(id),
	feedback_instructor varchar(255)
);

go

CREATE TABLE curricular_unit
(
	id int primary key not null identity,
	name varchar(100) not null,
	duration int not null
);

go

CREATE TABLE subject
(
	id int primary key not null identity,
	id_user_responsible int not null foreign key references users(id),
	id_curricular_unit int not null foreign key references curricular_unit(id),
	grade float not null
);

go

CREATE TABLE subject_competence
(
	id int primary key not null identity,
	id_subject int not null foreign key references subject(id),
	id_competence int not null foreign key references competence(id)
);

go

CREATE TABLE objective
(
	id int primary key not null identity,
	content varchar(255) not null,
	id_subject int not null foreign key references subject(id)
);

go

CREATE TABLE especific_objectives
(
	id int primary key not null identity,
	identification varchar(255) not null,
	--ressources varchar(255) not null,
	time float not null,
	evaluation_criteria varchar(255) not null,
	id_objective int not null foreign key references objective(id)
);
