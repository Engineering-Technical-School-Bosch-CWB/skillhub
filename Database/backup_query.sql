DECLARE @BackupFileName NVARCHAR(200);
SET @BackupFileName = 'C:\data\skillhub\skillhub_backup-' + FORMAT(GETDATE(), 'yyyy-MM-dd_HH-mm')+ '.bak'

DECLARE @sql NVARCHAR(MAX);
set @sql = 'BACKUP DATABASE dbskillhub TO DISK = ''' + @BackupFileName + '''';

GO
Exec sp_executesql @sql;
GO


-- RESTORE DATABASE dbskillhub
-- 	FROM DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\dbskillhub.bak'
-- 	WITH MOVE 'dbskillhub' TO 'C:\data\skillhub\skillhub.mdf',
-- 		 MOVE 'dbskillhub_log' TO 'C:\data\skillhub\skillhub.ldf',
-- 		 RECOVERY, REPLACE