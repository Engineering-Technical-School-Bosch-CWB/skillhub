using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SpecificObjectiveClassMap : IEntityTypeConfiguration<SpecificObjective>
{
    public void Configure(EntityTypeBuilder<SpecificObjective> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____SpecificObjectives");

        builder.ToTable("specific_objectives");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.HasOne(e => e.Subject)
            .WithMany(s => s.SpecificObjectives)
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

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

    }
}


