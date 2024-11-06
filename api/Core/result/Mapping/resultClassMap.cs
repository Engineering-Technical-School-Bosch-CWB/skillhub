using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Domain.Models;
namespace api.Core.Mapping;

public class ResultClassMap : IEntityTypeConfiguration<Result>
{
    public void Configure(EntityTypeBuilder<Result> builder)
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


