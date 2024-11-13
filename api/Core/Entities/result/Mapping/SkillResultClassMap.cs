using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SkillResultClassMap : IEntityTypeConfiguration<SkillResult>
{
    public void Configure(EntityTypeBuilder<SkillResult> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Result");

        builder.ToTable("skill_result");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Aptitude)
            .HasColumnName("aptitude");

        builder.Property(e => e.Weight)
            .HasColumnName("weight");

        builder.Property(e => e.EvaluatedAt)
            .HasColumnName("evaluated_at");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(s => s.Subject)
            .WithMany()
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Exam)
            .WithMany()
            .HasForeignKey("exam_id")
            .HasPrincipalKey(e => e.Id);

        builder.HasOne(s => s.Skill)
            .WithMany()
            .HasForeignKey("skill_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Subject)
            .WithMany()
            .HasForeignKey("student_id")
            .HasPrincipalKey(s => s.Id);
    }
}


