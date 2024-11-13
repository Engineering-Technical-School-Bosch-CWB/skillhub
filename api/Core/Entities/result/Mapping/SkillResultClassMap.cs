using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SkillResultClassMap : IEntityTypeConfiguration<SkillResult>
{
    public void Configure(EntityTypeBuilder<SkillResult> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Result");

        builder.ToTable("result");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Feedback)
            .HasColumnName("feedback");

        builder.Property(e => e.Aptitude)
            .HasColumnName("aptitude");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.CompetenceId)
            .HasColumnName("competence_id");

    }
}


