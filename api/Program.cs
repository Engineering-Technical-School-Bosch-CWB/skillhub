
using Api.Core.Middlewares;
using Api.Configuration;


var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureDomain(builder.Configuration);

builder.Services
    .ConfigureDatabase(builder.Configuration)
    .ConfigureJwt(builder.Configuration)
    .ConfigureMiddlewares(builder.Configuration)
    .ConfigureAddons()
    .ConfigureEntitiesRepositories()
    .ConfigureEntitiesServices()
    .ConfigureMainConfigs();

var app = builder.Build();

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

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.UseExceptionHandler();

app.MapControllers();

app.Run();

