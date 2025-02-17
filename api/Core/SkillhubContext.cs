using Microsoft.EntityFrameworkCore;

using Api.Core.Mapping;
using Api.Domain.Models;

namespace Api.Core;

public partial class SkillhubContext : DbContext
{
    public SkillhubContext() {}

    public SkillhubContext(DbContextOptions<SkillhubContext> options)
         : base(options)
    {}
    public virtual DbSet<Sector> SectorList { get; set; }
    public virtual DbSet<OccupationArea> OccupationAreaList { get; set; }
    public virtual DbSet<Position> PositionList { get; set; }
    public virtual DbSet<User> UserList { get; set; }
    public virtual DbSet<UserImage> UserImageList { get; set; }
    public virtual DbSet<Course> CourseList { get; set; }
    public virtual DbSet<Class> ClassList { get; set; }
    public virtual DbSet<SubjectArea> SubjectAreaList { get; set; }
    public virtual DbSet<Student> StudentList { get; set; }
    public virtual DbSet<StudentResult> StudentResultList { get; set; }
    public virtual DbSet<Feedback> FeedbackList { get; set; }
    public virtual DbSet<CurricularUnit> CurricularUnitList { get; set; }
    public virtual DbSet<Subject> SubjectList { get; set; }
    public virtual DbSet<Skill> SkillList { get; set; }
    public virtual DbSet<SkillResult> SkillResultList { get; set; }
    public virtual DbSet<Post> PostList { get; set; }
    public virtual DbSet<Attachment> AttachmentList { get; set; }
    public virtual DbSet<SpecificObjectives> SpecificObjectivesList { get; set; }
    public virtual DbSet<Exam> ExamList { get; set; }
    public virtual DbSet<Objection> ObjectionList { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AttachmentClassMap());
        modelBuilder.ApplyConfiguration(new ClassClassMap());
        modelBuilder.ApplyConfiguration(new CourseClassMap());
        modelBuilder.ApplyConfiguration(new CurricularUnitClassMap());
        modelBuilder.ApplyConfiguration(new ExamClassMap());
        modelBuilder.ApplyConfiguration(new FeedbackClassMap());
        modelBuilder.ApplyConfiguration(new ObjectionClassMap());
        modelBuilder.ApplyConfiguration(new OccupationAreaClassMap());
        modelBuilder.ApplyConfiguration(new PositionClassMap());
        modelBuilder.ApplyConfiguration(new PostClassMap());
        modelBuilder.ApplyConfiguration(new SectorClassMap());
        modelBuilder.ApplyConfiguration(new SubjectAreaClassMap());
        modelBuilder.ApplyConfiguration(new SkillClassMap());
        modelBuilder.ApplyConfiguration(new SkillResultClassMap());
        modelBuilder.ApplyConfiguration(new SpecificObjectivesClassMap());
        modelBuilder.ApplyConfiguration(new StudentClassMap());
        modelBuilder.ApplyConfiguration(new StudentResultClassMap());
        modelBuilder.ApplyConfiguration(new SubjectClassMap());
        modelBuilder.ApplyConfiguration(new UserClassMap());
        modelBuilder.ApplyConfiguration(new UserImageClassMap());
        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
