using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;

namespace Api.Core.Mapping;

public class ClassClassMap : IEntityTypeConfiguration<Class>
{
    public void Configure(EntityTypeBuilder<Class> builder)
    {
        builder.HasKey(c => c.Id).HasName("PK____Class");

        builder.ToTable("class");

        builder.Property(c => c.Id)
            .HasColumnName("id");

        builder.HasOne(c => c.Course)
            .WithMany(c => c.Classes)
            .HasForeignKey("course_id")
            .HasPrincipalKey(c => c.Id);

        builder.Property(c => c.StartingYear)
            .HasColumnType("smallint")
            .HasColumnName("starting_year");

        builder.Property(c => c.DurationPeriods)
            .HasColumnType("tinyint")
            .HasColumnName("duration_periods");

        builder.Property(c => c.IsActive)
            .HasColumnName("is_active");

        builder.Property(c => c.IsArchived)
            .HasColumnName("is_archived");

        builder.Property(c => c.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.Property(c => c.Abbreviation)
            .HasMaxLength(10)
            .HasColumnName("abbreviation");
    }
}
