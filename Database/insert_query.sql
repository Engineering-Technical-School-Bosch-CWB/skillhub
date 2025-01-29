use [dbskillhub]
GO

INSERT INTO [position] values ('Meio Oficial', 1, 2);
INSERT INTO [position] values ('Aprendiz', 1, 1);
INSERT INTO [position] values ('Instrutor', 1, 2);
GO

INSERT INTO [sector] VALUES ('ETS', 1);
INSERT INTO [sector] VALUES ('BDO', 1);
INSERT INTO [sector] VALUES ('ICO', 1);
GO

INSERT INTO [occupation_area] values ('TI',1);
INSERT INTO [occupation_area] values ('Mecânica',1);
INSERT INTO [occupation_area] values ('Eletronica',1);
GO
select * from [user]
INSERT INTO [user] VALUES ('Nycollas Sobolevski', '00000000', 'AQAAAAIAAYagAAAAEKqFHRe1SuSjwSZLvQYjtcpwSiAzkH5/rYJ4CkD6Nil3NPJWzWTaWA//++l2QP6cvw==', '2003/10/05', 1, 1, 1,1);
INSERT INTO [user] VALUES ('Lorena Gobara', '00000001', 'AQAAAAIAAYagAAAAEKqFHRe1SuSjwSZLvQYjtcpwSiAzkH5/rYJ4CkD6Nil3NPJWzWTaWA//++l2QP6cvw==', '05-10-2003', 1, 1, 1, 1);
GO

INSERT INTO [course] VALUES (1, 'Digital Talent Academy', 'DTA', 1 );
INSERT INTO [course] VALUES (1, 'Desenvolvimento de Sistemas', 'TDS', 1 );
INSERT INTO [course] VALUES (1, 'Cibersistemas', 'Cyber', 1 );
GO

INSERT INTO [class] VALUES ('Digital Talent Academy 2024', 1, 2024, 4, 1, 'DTA 2024');
INSERT INTO [class] VALUES ('Técnico em Desenvolvimento de Sistemas 2022', 2, 2022, 4, 1, 'TDS 22');
INSERT INTO [class] VALUES ('Cibersistemas 2024', 3, 2024, 4, 1, 'Ciber 24');
GO

INSERT INTO [student] VALUES (100, 100,1, 1, 2);
GO

