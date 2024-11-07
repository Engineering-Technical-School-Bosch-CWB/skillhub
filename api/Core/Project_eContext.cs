using Microsoft.EntityFrameworkCore;

using Api.Core.Mapping;

using Api.Domain.Models;

namespace Api.Core;

public partial class Project_eContext : DbContext
{
    public Project_eContext() {}

    public Project_eContext(DbContextOptions<Project_eContext> options)
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
    public virtual DbSet<Feedback> FeedbackList { get; set; }
    public virtual DbSet<CurricularUnit> CurricularUnitList { get; set; }
    public virtual DbSet<Subject> SubjectList { get; set; }
    public virtual DbSet<Competence> CompetenceList { get; set; }
    public virtual DbSet<Result> ResultList { get; set; }
    public virtual DbSet<SpecificObjectives> SpecificObjectivesList { get; set; }
    protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(@"Data Source=CA-C-0064T\SQLEXPRESS;Initial Catalog=Project_e;Integrated Security=True;Trust Server Certificate=True;");
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new SectorClassMap());
        modelBuilder.ApplyConfiguration(new OccupationAreaClassMap());
        modelBuilder.ApplyConfiguration(new PositionClassMap());
        modelBuilder.ApplyConfiguration(new UserClassMap());
        modelBuilder.ApplyConfiguration(new UserImageClassMap());
        modelBuilder.ApplyConfiguration(new CourseClassMap());
        modelBuilder.ApplyConfiguration(new ClassClassMap());
        modelBuilder.ApplyConfiguration(new SubjectAreaClassMap());
        modelBuilder.ApplyConfiguration(new StudentClassMap());
        modelBuilder.ApplyConfiguration(new FeedbackClassMap());
        modelBuilder.ApplyConfiguration(new CurricularUnitClassMap());
        modelBuilder.ApplyConfiguration(new SubjectClassMap());
        modelBuilder.ApplyConfiguration(new CompetenceClassMap());
        modelBuilder.ApplyConfiguration(new ResultClassMap());
        modelBuilder.ApplyConfiguration(new SpecificObjectivesClassMap());
        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
