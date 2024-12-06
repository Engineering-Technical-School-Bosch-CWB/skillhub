using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SkillResultClassMap : IEntityTypeConfiguration<SkillResult>
{
    public void Configure(EntityTypeBuilder<SkillResult> builder)
    {
        builder.HasKey(s => s.Id).HasName("PK____SkillResult");

        builder.ToTable("skill_result");

        builder.Property(s => s.Id)
            .HasColumnName("id");

        builder.Property(s => s.Aptitude)
            .HasColumnName("aptitude");

        builder.Property(s => s.Weight)
            .HasColumnName("weight");

        builder.Property(s => s.EvaluatedAt)
            .HasColumnName("evaluated_at");

        builder.Property(s => s.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(s => s.Subject)
            .WithMany()
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Exam)
            .WithMany(e => e.SkillResults)
            .HasForeignKey("exam_id")
            .HasPrincipalKey(e => e.Id);

        builder.HasOne(s => s.Skill)
            .WithMany()
            .HasForeignKey("skill_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Student)
            .WithMany()
            .HasForeignKey("student_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(s => s.Objection)
            .WithMany()
            .HasForeignKey("objection_id")
            .HasPrincipalKey(o => o.Id);
    }
}


