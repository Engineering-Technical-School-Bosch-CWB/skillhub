using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SpecificObjectivesClassMap : IEntityTypeConfiguration<SpecificObjectives>
{
    public void Configure(EntityTypeBuilder<SpecificObjectives> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____SpecificObjectives");

        builder.ToTable("specific_objectives");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Identification)
            .HasMaxLength(300)
            .HasColumnName("identification");

        builder.Property(e => e.Ressources)
            .HasMaxLength(300)
            .HasColumnName("ressources");

        builder.Property(e => e.Time)
            .HasColumnName("time");

        builder.Property(e => e.EvaluationCriteria)
            .HasMaxLength(500)
            .HasColumnName("evaluation_criteria");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.SubjectId)
            .HasColumnName("subject_id");

    }
}


