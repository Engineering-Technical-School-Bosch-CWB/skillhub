using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class StudentResultClassMap : IEntityTypeConfiguration<StudentResult>
{
    public void Configure(EntityTypeBuilder<StudentResult> builder)
    {
        builder.HasKey(s => s.Id).HasName("PK____StudentResult");

        builder.ToTable("student_result");

        builder.Property(s => s.Id)
            .HasColumnName("id");

        builder.HasOne(s => s.Student)
            .WithMany(s => s.Results)
            .HasForeignKey("student_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Exam)
            .WithMany(e => e.Results)
            .HasForeignKey("exam_id")
            .HasPrincipalKey(e => e.Id);

        builder.HasOne(s => s.Subject)
            .WithMany(s => s.Results)
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

        builder.Property(u => u.Score)
            .HasColumnName("score");
            
        builder.Property(u => u.SkillScore)
            .HasColumnName("skill_score");

        builder.Property(u => u.IsActive)
            .HasColumnName("is_active");
    }
}


