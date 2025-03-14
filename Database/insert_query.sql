-- SkillHub database insert base query after migration
use dbskillhub

insert [occupation_area] values ('TI', 1);
GO
insert [sector] values ('ETS', 1);
GO
insert [position] values ('ADMIN', 1, 2, 2);
GO
insert [user] values ('ADMIN', 'admin', 'AQAAAAIAAYagAAAAEKqFHRe1SuSjwSZLvQYjtcpwSiAzkH5/rYJ4CkD6Nil3NPJWzWTaWA//++l2QP6cvw==', null, 1, 1, 1, 1, 0, null)
