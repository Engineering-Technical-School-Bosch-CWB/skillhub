# SkillHub

[Excalidraw (banco - uso real)](https://excalidraw.com/#room=114b9c48c1252563a8fc,J-9EAKgDjhiY6qSNGlmH1A)

[DrawIo (banco - estrutura)](https://drive.google.com/file/d/1GimoezsFH2gIr3zoZXtKwcGyw3yuuM5c/view?usp=sharing)

[Excalidraw (Telas)](https://excalidraw.com/#room=101b4e8167b7871b19c0,uzQJxNXB0gdBE5HK5-o7ow)

[Endpoints](/api/endpoints.md)

## Configuration and API Response Patterns

### JSON Model Example for `appsettings.json`
Replace placeholders like [server name] and [secret key] with your actual values.

```javascript
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "SqlServer": "Data Source=[server name];Initial Catalog=[dbskillhub - database name];Integrated Security=True;Trust Server Certificate=True;"
  },
  "JwtSettings": {
    "SecretKey": "[secret key]"
  }
}
```

### Endpoints Responses
Default response messages returned by the endpoints. 

| HTTP Method    | Response Message                          |
|----------------|------------------------------------------|
| `GET`          | "**[entity]** found!"                   |
| `GET paginated`| "**[entities]** found!"                 |
| `POST`         | "**[entity]** created successfully!"    |
| `PATCH`        | "**[entity]** updated successfully!"    |


### Script to create database

```sql
CREATE DATABASE dbskillhub
ON 
PRIMARY (
	NAME = dbskillhub,
	filename = 'C:\data\dbskillhub.mdf'),
FILEGROUP FileStreamDbskillhub CONTAINS FILESTREAM  (
	NAME = dbskillhub_stream,
	filename = 'C:\data\filestreamdbskillhub')
LOG ON ( 
	NAME = dbskillhub_log,
	filename = 'C:\data\dbskillhub.ldf')
GO
```

<br>

> [!NOTE]
> **Use new migrations** - You may need to drop your database before applying.