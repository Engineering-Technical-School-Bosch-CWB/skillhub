using Api.Core.Middlewares;
using Api.Core.Services;
using Api.Core.Repositories;
using System.IdentityModel.Tokens.Jwt;
using Api.Core.Middlewares;
using Api.Core.Services;
using Api.Core;
using Api.Core.Services;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Microsoft.EntityFrameworkCore;

using dotenv.net;
using System.IdentityModel.Tokens.Jwt;
using Api.Core;
using Microsoft.EntityFrameworkCore;
using Genesis.Core.Repositories;
using Genesis.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Api;

public class Program 
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        ConfigureServices(builder.Services, builder.Configuration);

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

        app.UseExceptionHandler();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

    private static void ConfigureServices( 
        IServiceCollection services,
        ConfigurationManager configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlServer");
        services.AddDbContext<SkillhubContext>(
            options => options.UseSqlServer(connectionString)
        );

        var jwtSettings = new JwtSettings()
        {
            SecretKey = configuration.GetSection("JwtSettings")
                    .GetValue<string>("SecretKey")!
        };
        services.AddSingleton(jwtSettings);  
 
        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddTransient<AuthenticationMiddleware>();

        services.AddSingleton<JwtSecurityTokenHandler>();  
        services.AddSingleton<ConfigurationManager>();    
        services.AddSingleton<PasswordHasher<User>>();           
        services.AddScoped<UserContext>();

        services.AddScoped<BaseRepository<User>, UserRepository>();   

        services.AddScoped<IUserRepository, UserRepository>();         
        // services.AddScoped<IPositionRepository, PositionRepository>();    
        services.AddScoped<ISectorRepository, SectorRepository>();   
        services.AddScoped<IOccupationAreaRepository, OccupationAreaRepository>();   

        services.AddScoped<JwtService>();
        services.AddScoped<UserService>();
        services.AddScoped<LoginService>();       

        
        services.AddScoped<BaseRepository<Class>, ClassRepository>();
        services.AddScoped<BaseRepository<CurricularUnit>, CurricularUnitRepository>();
        services.AddScoped<BaseRepository<Position>, PositionRepository>();
        services.AddScoped<BaseRepository<Student>, StudentRepository>();
        services.AddScoped<BaseRepository<Subject>, SubjectRepository>();
        services.AddScoped<BaseRepository<User>, UserRepository>();
        // services.AddScoped<IClassService, ClassService>();
        // services.AddScoped<IPositionService, PositionService>();
        // services.AddScoped<IStudentService, StudentService>();
        // services.AddScoped<ISubjectService, SubjectService>();
        // services.AddScoped<IUserService, UserService>();
        services.AddScoped<IClassRepository, ClassRepository>();
        services.AddScoped<ICurricularUnitRepository, CurricularUnitRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IOccupationAreaRepository, OccupationAreaRepository>();
        // services.AddScoped<IPositionRepository, PositionRepository>();
        services.AddScoped<ISectorRepository, SectorRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();
        services.AddScoped<ISubjectRepository, SubjectRepository>();
        services.AddScoped<IUserRepository, UserRepository>(); 

        services.AddCors();
        services.AddControllers();
        services.AddAuthorization();
        services.AddProblemDetails();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}

