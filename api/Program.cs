using api.Core.Middlewares;
using api.Core.Services.Pagination;
using Api.Core.JWTService;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Domain.Repositories;
using Api.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ErrorHandlingMiddleware>();
builder.Services.AddSingleton<AuthenticationMiddleware>();

builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<PaginationService>();

builder.Services.AddScoped<IPositionRepository, PositionRepository>();

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
