using Api.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Genesis.Core.Repositories;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureEntitiesRepositories(this IServiceCollection services)
    {
        services.AddScoped<BaseRepository<Class>, ClassRepository>();
        services.AddScoped<IClassRepository, ClassRepository>();

        services.AddScoped<BaseRepository<Course>, CourseRepository>();
        services.AddScoped<ICourseRepository, CourseRepository>();

        services.AddScoped<BaseRepository<CurricularUnit>, CurricularUnitRepository>();
        services.AddScoped<ICurricularUnitRepository, CurricularUnitRepository>();

        services.AddScoped<BaseRepository<Exam>, ExamRepository>();
        services.AddScoped<IExamRepository, ExamRepository>();

        services.AddScoped<BaseRepository<Feedback>, FeedbackRepository>();
        services.AddScoped<IFeedbackRepository, FeedbackRepository>();

        services.AddScoped<BaseRepository<Objection>, ObjectionRepository>();
        services.AddScoped<IObjectionRepository, ObjectionRepository>();

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

        services.AddScoped<BaseRepository<StudentResult>, StudentResultRepository>();
        services.AddScoped<IStudentResultRepository, StudentResultRepository>();

        services.AddScoped<BaseRepository<Subject>, SubjectRepository>();
        services.AddScoped<ISubjectRepository, SubjectRepository>();

        services.AddScoped<BaseRepository<SubjectArea>, SubjectAreaRepository>();
        services.AddScoped<ISubjectAreaRepository, SubjectAreaRepository>();

        services.AddScoped<BaseRepository<User>, UserRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<BaseRepository<Image>, ImageRepository>();
        services.AddScoped<IImageRepository, ImageRepository>();
        return services;
    }
}