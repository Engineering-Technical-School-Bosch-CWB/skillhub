using System.Linq.Expressions;
using Api.Core.Services;
using Api.Domain.Services;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureEntitiesServices (this IServiceCollection services) 
    {
        services.AddScoped<IClassService, ClassService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ICurricularUnitService, CurricularUnitService>();
        services.AddScoped<IExamService, ExamService>();
        services.AddScoped<IFeedbackService, FeedbackService>();
        services.AddScoped<IObjectionService, ObjectionService>();
        services.AddScoped<IPositionService, PositionService>();
        services.AddScoped<ISectorService, SectorService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddScoped<ISkillResultService, SkillResultService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<IStudentResultService, StudentResultService>();
        services.AddScoped<ISubjectService, SubjectService>();
        services.AddScoped<ISubjectAreaService, SubjectAreaService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IOccupationAreaService, OccupationAreaService>();
        services.AddScoped<IImageService, ImageService>();
        services.AddScoped<IEventMemberService, EventMemberService>();
        return services;
    }
}