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

INSERT INTO [subject_area] VALUES ('Backend', 1);
INSERT INTO [subject_area] VALUES ('Frontend', 1);
INSERT INTO [subject_area] VALUES ('Mecanica', 1);
INSERT INTO [subject_area] VALUES ('Eletronica', 1);
INSERT INTO [subject_area] VALUES ('Programação', 1);
GO

select * from [curricular_unit] 
INSERT INTO [curricular_unit] VALUES ('C# Básico', 1, 1);
INSERT INTO [curricular_unit] VALUES ('WEB', 2, 1);
INSERT INTO [curricular_unit] VALUES ('CNC', 3, 1);
INSERT INTO [curricular_unit] VALUES ('Eletronica Digital', 4, 1);
INSERT INTO [curricular_unit] VALUES ('Python', 5, 1);
GO

select * from [course]
select * from [student]
insert student values (null, null, 1, 1, 1)


select * from [class] 
select * from [user] as u left join student as s on u.id = s.user_id

select sr.* from [skill_result] as sr
    join [student] as s
        on sr.student_id = s.id
    join [user] as u 
        on s.user_id = u.id
        where u.id = 3

insert into occupation_area values ('mecanica',1)
select * from position
select * from student

select * from [user]
select * from [student]

update [student] set is_active = 0 where id = 5;
update [user] set is_active = 0 where id = 5;

delete [user] where id = 8
delete [student] where user_id = 8


insert into student values (75,75,1,5, 1)