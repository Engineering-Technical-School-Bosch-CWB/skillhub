using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SkillClassMap : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        builder.HasKey(s => s.Id).HasName("PK____Skill");

        builder.ToTable("skill");

        builder.Property(s => s.Id)
            .HasColumnName("id");

        builder.Property(s => s.Description)
            .HasMaxLength(255)
            .HasColumnName("description");

        builder.Property(s => s.EvaluationCriteria)
            .HasColumnName("evaluation_criteria");

        builder.Property(s => s.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(s => s.CurricularUnit)
            .WithMany(c => c.Skills)
            .HasForeignKey("curricular_unit_id")
            .HasPrincipalKey(c => c.Id);
    }
}


