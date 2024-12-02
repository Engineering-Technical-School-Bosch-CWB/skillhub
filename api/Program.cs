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
        #region Database connection

        var connectionString = configuration.GetConnectionString("SqlServer");
        services.AddDbContext<SkillhubContext>(
            options => options.UseSqlServer(connectionString)
        );

        #endregion

        #region Jwt

        var jwtSettings = new JwtSettings()
        {
            SecretKey = configuration.GetSection("JwtSettings")
                    .GetValue<string>("SecretKey")!
        };
        services.AddSingleton(jwtSettings);
        services.AddSingleton<JwtSecurityTokenHandler>();
        services.AddScoped<JwtService>();

        #endregion


        #region Middlewares

        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddTransient<AuthenticationMiddleware>();
        services.AddScoped<UserContext>();

        #endregion

        #region Utils

        services.AddSingleton<ConfigurationManager>();
        services.AddSingleton<PasswordHasher<User>>();

        #endregion

        #region Repositories

        services.AddScoped<BaseRepository<Class>, ClassRepository>();
        services.AddScoped<IClassRepository, ClassRepository>();

        services.AddScoped<BaseRepository<Course>, CourseRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();

        services.AddScoped<BaseRepository<CurricularUnit>, CurricularUnitRepository>();
        services.AddScoped<ICurricularUnitRepository, CurricularUnitRepository>();

        services.AddScoped<BaseRepository<OccupationArea>, OccupationAreaRepository>();
        services.AddScoped<IOccupationAreaRepository, OccupationAreaRepository>();

        services.AddScoped<BaseRepository<Position>, PositionRepository>();
        services.AddScoped<IPositionRepository, PositionRepository>();

        services.AddScoped<BaseRepository<Sector>, SectorRepository>();
        services.AddScoped<ISectorRepository, SectorRepository>();

        services.AddScoped<BaseRepository<Skill>, SkillRepository>();
        services.AddScoped<ISkillRepository, SkillRepository>();

        services.AddScoped<BaseRepository<SkillResult>, SkillResultRepository>();
        services.AddScoped<ISkillResultRepository, SkillResultRepository>();

        services.AddScoped<BaseRepository<Student>, StudentRepository>();
        services.AddScoped<IStudentRepository, StudentRepository>();

        services.AddScoped<BaseRepository<Subject>, SubjectRepository>();
        services.AddScoped<ISubjectRepository, SubjectRepository>();

        services.AddScoped<BaseRepository<SubjectArea>, SubjectAreaRepository>();
        services.AddScoped<ISubjectAreaRepository, SubjectAreaRepository>();

        services.AddScoped<BaseRepository<User>, UserRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        #endregion

        #region Services

        services.AddScoped<IClassService, ClassService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ICurricularUnitService, CurricularUnitService>();
        services.AddScoped<ILoginService, LoginService>();
        services.AddScoped<IPaginationService, PaginationService>();
        services.AddScoped<IPositionService, PositionService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ISubjectService, SubjectService>();
        services.AddScoped<ISubjectAreaService, SubjectAreaService>();
        services.AddScoped<IUserService, UserService>();

        #endregion

        #region Config

        services.AddAutoMapper(typeof(Program));
        services.AddCors();

        services.AddControllers();

        services.AddAuthorization();
        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddProblemDetails();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        #endregion
    }
}

