CREATE TABLE [sector] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(100) NOT NULL,
    [is_active] BIT NOT NULL
);
GO

CREATE TABLE [occupation_area] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(100) NOT NULL,
    [is_active] BIT NOT NULL
);
GO

CREATE TABLE [position] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(100) NOT NULL,
    [is_active] BIT NOT NULL,
    [sector_id] INT NOT NULL FOREIGN KEY REFERENCES [sector] ([id]),
    [occupation_id] INT NOT NULL FOREIGN KEY REFERENCES [occupation_area] ([id])
);
GO

CREATE TABLE [user] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(500) NOT NULL,
    [identification] VARCHAR(100) NOT NULL,
    [hash] VARCHAR(255) NOT NULL,
    [card] VARCHAR(10) NOT NULL,
    [birthday] DATE,
    [new_user] BIT NOT NULL,
    [is_active] BIT NOT NULL,
    [position_id] INT NOT NULL FOREIGN KEY REFERENCES [position] ([id])
);
GO

CREATE TABLE [user_image](
    [id] INT NOT NULL PRIMARY KEY,
    [image] VARBINARY(MAX) FILESTREAM NOT NULL,
    [user_id] INT NOT NULL FOREIGN KEY REFERENCES [user] ([id])
);
GO

CREATE TABLE [course](
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [abbreviation] VARCHAR(50) NOT NULL,
);
GO

CREATE TABLE [subject_area] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [is_active] BIT NOT NULL
);
GO

CREATE TABLE [student](
    [id] INT NOT NULL PRIMARY KEY,
    [grade] FLOAT NOT NULL,
    [personal_feedback] VARCHAR(MAX),
    [is_active] BIT NOT NULL,
    [user_id] INT NOT NULL FOREIGN KEY REFERENCES [user] ([id]),
    [class_id] INT NOT NULL FOREIGN KEY REFERENCES [class] ([id])
);
GO

CREATE TABLE [curricular_unit] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [duration] FLOAT NOT NULL,
    [is_active] BIT NOT NULL,
    [course_id] INT NOT NULL FOREIGN KEY REFERENCES course ([id]),
    [subject_area_id] INT NOT NULL FOREIGN KEY REFERENCES subject_area ([id])
);
GO

CREATE TABLE [subject] (
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [is_active] BIT NOT NULL,
    [instructor_id] INT NOT NULL FOREIGN KEY REFERENCES [user] ([id]),
    [curricular_unit_id] INT NOT NULL FOREIGN KEY REFERENCES [curricular_unit] ([id]),
    [class_id] INT NOT NULL FOREIGN KEY REFERENCES [class] ([id])
);
GO

CREATE TABLE [class](
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [is_active] BIT NOT NULL,
    [course_id] INT NOT NULL FOREIGN KEY REFERENCES [course] ([id])
);
GO

CREATE TABLE [competence](
    [id] INT NOT NULL PRIMARY KEY,
    [description] VARCHAR(255) NOT NULL,
    [is_active] BIT NOT NULL,
    [subject_id] INT NOT NULL FOREIGN KEY REFERENCES [subject] ([id])
);
GO

CREATE TABLE [result](
    [id] INT NOT NULL PRIMARY KEY,
    [feedback] VARCHAR(MAX),
    [aptitude] TINYINT NULL,
    [is_active] BIT NOT NULL,
    [competence_id] INT NOT NULL FOREIGN KEY REFERENCES [competence] ([id])
);
GO

CREATE TABLE [specific_objectives](
    [id] INT NOT NULL PRIMARY KEY,
    [identification] VARCHAR(300) NOT NULL,
    [ressources] VARCHAR(300) NULL,
    [time] INT NOT NULL,
    [evaluation_criteria] VARCHAR(500) NULL,
    [is_active] BIT NOT NULL,
    [subject_id] INT NOT NULL FOREIGN KEY REFERENCES [subject] ([id])
);
GO

-- CREATE TABLE [post] (
--     [id] INT NOT NULL PRIMARY KEY,
--     [title] VARCHAR(255) NOT NULL,
--     [body] NVARCHAR(MAX),
--     [is_active] BIT NOT NULL,
--     [subject_id] INT NOT NULL FOREIGN KEY REFERENCES [subject] ([id])
-- );
-- GO

-- CREATE TABLE [attachment] (
--     [id] INT NOT NULL PRIMARY KEY,
--     [content] FILESTREAM NOT NULL,
--     [extensions] VARCHAR(10) NOT NULL,
--     [is_active] BIT NOT NULL
--     [post_id] INT NOT NULL FOREIGN KEY REFERENCES [post] ([id])
-- );
-- GO