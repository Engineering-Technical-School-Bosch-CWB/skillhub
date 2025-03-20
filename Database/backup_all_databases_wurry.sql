USE master;
GO

DECLARE @CurrentName NVARCHAR(255);
DECLARE @command NVARCHAR(max);
DECLARE @Databases table ([name] NVARCHAR(255));
DECLARE @Path NVARCHAR(MAX);

DECLARE @CheckIfExists NVARCHAR(MAX);
DECLARE @CreateDirComand VARCHAR(3000);

--! ----------- DANGER ZONE ----------------
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
--! ----------- DANGER ZONE ----------------

INSERT INTO @Databases ([name])
    SELECT [name] FROM sys.databases
    WHERE [name] not in ('master','tempdb','model','msdb')


DECLARE _cursor CURSOR FOR
    SELECT [name] FROM @Databases;

OPEN _cursor
    FETCH NEXT FROM _cursor INTO @CurrentName

WHILE @@FETCH_STATUS = 0
BEGIN
    
    SET @Path = 'C:/data/backupDatabases/' + @CurrentName + '/';

    SET @CheckIfExists = 'IF NOT EXIST "' + @Path + '" mkdir "' + @Path + '"';
    SET @CreateDirComand = 'cmd.exe /c ' + @CheckIfExists;

    EXEC xp_cmdshell @CreateDirComand, no_output;
    
    SET @Path = @Path +  @CurrentName + '_backup-' + FORMAT( GETDATE(), 'dd-MM-yyyy_HH-mm' ) + '.bak';

    SET @command = 'BACKUP DATABASE [' + @CurrentName + '] TO DISK = ''' + @Path + '''';
    
    PRINT 'Executando backup de: ' + @CurrentName
    print @command
    EXEC sp_executesql @command

    FETCH NEXT FROM _cursor INTO @CurrentName

END
CLOSE _cursor
DEALLOCATE _cursor

--! ----------- DANGER ZONE ----------------
EXEC sp_configure 'xp_cmdshell', 0;
RECONFIGURE;
--! ----------- DANGER ZONE ----------------