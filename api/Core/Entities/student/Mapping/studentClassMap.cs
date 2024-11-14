using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class StudentClassMap : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Student");

        builder.ToTable("student");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(s => s.OverallScore)
            .HasColumnName("overall_score");
        
        builder.Property(s => s.OverallSkillScore)
            .HasColumnName("overall_skill_score");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");
        
        builder.HasOne(s => s.User)
            .WithOne(u => u.StudentProfile)
            .HasForeignKey("user_id");
        
        builder.HasOne(s => s.Class)
            .WithMany(c => c.Students)
            .HasForeignKey("class_id")
            .HasPrincipalKey(c => c.Id);

        builder.HasMany(s => s.Feedbacks)
            .WithOne(f => f.Student);
    }
}


