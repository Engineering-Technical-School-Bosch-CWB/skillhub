using System.IdentityModel.Tokens.Jwt;
using Api.Core;
using Api.Core.Middlewares;
using Api.Core.Services;
using Api.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;

using Genesis.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Api;

public class Program 
{
    static void Main(string[] args)
    {
        DotNetEnv.Env.Load("./.env");

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

        app.UseAuthorization();

        app.UseExceptionHandler();

        app.MapControllers();

        app.Run();
    }

    private static void ConfigureServices( 
        IServiceCollection services,
        ConfigurationManager configuration)
    {
        // databae connection
        var connectionHost = configuration["MSSQL_HOST"];
        var connectionDatabase = configuration["MSSQL_DATABASE"];
        services.AddDbContext<SkillhubContext>(
            options => options.UseSqlServer($"Server={connectionHost};Database={connectionDatabase};Trusted_Connection=True;TrustServerCertificate=True;")
        );

        // ..jwt 
        var jwtSettings = new JwtSettings()
        {
            SecretKey = configuration["JWT_SECRET_KEY"]!,
        }; 
        services.AddSingleton(jwtSettings);  
        services.AddSingleton<JwtSecurityTokenHandler>();  
        services.AddScoped<JwtService>();
 
        // ..middlewares
        services.AddScoped<AuthenticationMiddleware>();
        services.AddSingleton<ErrorHandlingMiddleware>();
        services.AddScoped<UserContext>();

        // ..utils
        services.AddSingleton<ConfigurationManager>();    
        services.AddSingleton<PasswordHasher<User>>();           

        // ..repositories
        services.AddScoped<BaseRepository<User>, UserRepository>();   
        services.AddScoped<IUserRepository, UserRepository>();   

        services.AddScoped<BaseRepository<Class>, ClassRepository>();
        services.AddScoped<IClassRepository, ClassRepository>();

        services.AddScoped<BaseRepository<CurricularUnit>, CurricularUnitRepository>();
        services.AddScoped<ICurricularUnitRepository, CurricularUnitRepository>();

        services.AddScoped<BaseRepository<Position>, PositionRepository>();
        services.AddScoped<IPositionRepository, PositionRepository>();    

        services.AddScoped<BaseRepository<Student>, StudentRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();

        services.AddScoped<BaseRepository<Subject>, SubjectRepository>();
        services.AddScoped<ISubjectRepository, SubjectRepository>();

        services.AddScoped<BaseRepository<Sector>, SectorRepository>();
        services.AddScoped<ISectorRepository, SectorRepository>();   

        services.AddScoped<BaseRepository<OccupationArea>, OccupationAreaRepository>();
        services.AddScoped<IOccupationAreaRepository, OccupationAreaRepository>();   

        services.AddScoped<BaseRepository<Course>, CourseRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();

        // ..services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ILoginService, LoginService>();       
        services.AddScoped<IClassService, ClassService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IPositionService, PositionService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ISubjectService, SubjectService>();
        services.AddScoped<IPaginationService, PaginationService>();
        services.AddScoped<ICourseService, CourseService>();

        // ..config
        services.AddAutoMapper(typeof(Program));
        services.AddCors();
        services.AddControllers();
        services.AddAuthorization();
        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddProblemDetails();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}

