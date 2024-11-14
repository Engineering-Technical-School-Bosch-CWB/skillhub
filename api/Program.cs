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

builder.Services.AddScoped<BaseRepository<Position>, PositionRepository>();

builder.Services.AddScoped<IPositionService, PositionService>();

builder.Services.AddExceptionHandler<ErrorHandlingMiddleware>();
builder.Services.AddProblemDetails();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<AuthenticationMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseExceptionHandler();

app.Run();
