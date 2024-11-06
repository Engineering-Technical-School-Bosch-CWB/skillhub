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
    [id_sector] INT NOT NULL FOREIGN KEY REFERENCES [sector] ([id]),
    [id_occupation] INT NOT NULL FOREIGN KEY REFERENCES [occupation] ([id])
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
    [id_position] INT NOT NULL FOREIGN KEY REFERENCES [position] ([id])
);
GO

CREATE TABLE [course](
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [abbreviation] VARCHAR(50) NOT NULL,
);
GO

CREATE TABLE [class](
    [id] INT NOT NULL PRIMARY KEY,
    [name] VARCHAR(255) NOT NULL,
    [is_active] BIT NOT NULL,
    [id_course] INT NOT NULL FOREIGN KEY REFERENCES [course] ([id])
);
GO

CREATE TABLE [student]