using System.IdentityModel.Tokens.Jwt;
using api.Core.Middlewares;
using api.Core.Services.Pagination;
using Api.Core;
using Api.Core.JWTService;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var connectionHost = builder.Configuration["MSSQL_HOST"];
var connectionDatabase = builder.Configuration["MSSQL_DATABASE"];
builder.Services.AddDbContext<Project_eContext>(
    options => options.UseSqlServer($"Server={connectionHost};Database={connectionDatabase};Trusted_Connection=True;TrustServerCertificate=True;")
);

var jwtSettings = new JwtSettings()
{
    SecretKey = builder.Configuration["JWT_SECRET_KEY"]!,
};

builder.Services.AddSingleton(jwtSettings);
builder.Services.AddSingleton<JwtSecurityTokenHandler>();

builder.Services.AddSingleton<ErrorHandlingMiddleware>();
builder.Services.AddScoped<AuthenticationMiddleware>();

builder.Services.AddScoped<UserContext>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<PaginationService>();

builder.Services.AddScoped<BaseRepository<Class>, ClassRepository>();
builder.Services.AddScoped<BaseRepository<CurricularUnit>, CurricularUnitRepository>();
builder.Services.AddScoped<BaseRepository<Position>, PositionRepository>();
builder.Services.AddScoped<BaseRepository<Student>, StudentRepository>();
builder.Services.AddScoped<BaseRepository<Subject>, SubjectRepository>();
builder.Services.AddScoped<BaseRepository<User>, UserRepository>();

builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IClassRepository, ClassRepository>();
builder.Services.AddScoped<ICurricularUnitRepository, CurricularUnitRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IOccupationAreaRepository, OccupationAreaRepository>();
builder.Services.AddScoped<IPositionRepository, PositionRepository>();
builder.Services.AddScoped<ISectorRepository, SectorRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddExceptionHandler<ErrorHandlingMiddleware>();
builder.Services.AddProblemDetails();

builder.Services.AddCors();
builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// app.UseMiddleware<AuthenticationMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

// app.UseHttpsRedirection(); // TODO: figure out how to configure HTTPS redirection.

app.UseExceptionHandler();

app.UseAuthorization();

app.MapControllers();

app.Run();
