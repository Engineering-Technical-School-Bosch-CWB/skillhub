USE master;
GO

CREATE DATABASE Project_e
ON 
PRIMARY (
	NAME = Project_e,
	filename = 'C:\data\project_e.mdf'),
FILEGROUP FileStreamProjectE CONTAINS FILESTREAM  (
	NAME = Project_e_stream,
	filename = 'C:\data\filestreamprojecte')
LOG ON ( 
	NAME = Project_e_log,
	filename = 'C:\data\project_e.ldf')
GO

--EXEC sp_configure filestream_access_level,2; 
--RECONFIGURE
