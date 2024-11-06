CREATE TABLE [sector]
(
	[id] int primary key not null identity,
	[name] varchar(100) not null,
	[is_active] bit not null
);

go

CREATE TABLE [occupation_area]
(
	[id] int primary key not null identity,
	[name] varchar(100) not null,
	[is_active] bit not null
);

go

CREATE TABLE [position]
(
	[id] int primary key not null identity,
	[name] varchar(100) not null,
	[id_sector] int not null foreign key references [sector](id),
	[id_occupation_area] int not null foreign key references [occupation_area](id),
	[is_active] bit not null
);

go

CREATE TABLE [user]
(
	[id] int primary key not null identity,
	[name] varchar(500) not null,
	[identification] varchar(100) not null,
	[hash] varchar(255) not null,
	[salt] varchar(15) not null,
	[card] int null,
	[birthday] date null,
	[new_user] bit not null,
	[id_position] int not null foreign key references [position](id),
	[is_active] bit not null
);

go

CREATE TABLE [course]
(
	[id] int primary key not null identity,
	[name] varchar(255) not null,
	[abbreviation] varchar(50) not null
);

go

CREATE TABLE [class]
(
	[id] int primary key not null identity,
	[name] varchar(255) not null,
	[id_course] int not null foreign key references [course](id),
	[is_active] bit not null
);

go

CREATE TABLE [student]
(
	[id] int primary key not null identity,
	[id_user] int not null foreign key references [user](id),
	[id_class] int not null foreign key references [class](id),
	[grade] float null,
	[personal_feedback] varchar(max) null,
	[is_active] bit not null
);

go

CREATE TABLE [competence]
(
	[id] int primary key not null identity,
	[competence] varchar(255) not null,
	[is_active] bit not null
);

go

CREATE TABLE [result]
(
	[id] int primary key not null identity,
	[id_student] int not null foreign key references [student](id),
	[id_competence] int not null foreign key references [competence](id),
	[feedback_instructor] varchar(max) null,
	[feedback_student] varchar(max) null,
	[is_active] bit not null,
);

go

CREATE TABLE [curricular_unit]
(
	[id] int primary key not null identity,
	[name] varchar(255) not null,
	[duration] float not null,
	[is_active] bit not null
);

go

CREATE TABLE [subject_area]
(
	[id] int primary key not null identity,
	[name] varchar(255) not null,
	[is_active] bit not null
);

go

CREATE TABLE [subject]
(
	[id] int primary key not null identity,
	[id_user_responsible] int not null foreign key references [user](id),
	[id_curricular_unit] int not null foreign key references [curricular_unit](id),
	[id_subject_area] int not null foreign key references [subject_area](id),
	[name] varchar(255) not null,
	[grade] float null,
	[is_active] bit not null
);

go

CREATE TABLE [subject_competence]
(
	[id] int primary key not null identity,
	[id_competence] int not null foreign key references [competence](id),
	[id_subject] int not null foreign key references [subject](id),
	[is_active] bit not null
);

go

CREATE TABLE [especific_objectives]
(
	[id] int primary key not null identity,
	[identification] varchar(300) not null,
	[ressources] varchar(300) null,
	[time] int not null,
	[evaluation_criteria] varchar(500) null,
	[id_subject] int not null foreign key references [subject](id),
	[is_active] bit not null
);


