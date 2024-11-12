using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class ClassClassMap : IEntityTypeConfiguration<Class>
{
    public void Configure(EntityTypeBuilder<Class> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Class");

        builder.ToTable("class");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.StartingYear)
            .HasColumnType("smallint")
            .HasColumnName("starting_year");

        builder.Property(c => c.DurationPeriods)
            .HasColumnType("tinyint")
            .HasColumnName("duration_peridos");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(cl => cl.Course)
            .WithMany(co => co.Classes)
            .HasForeignKey("course_id")
            .HasPrincipalKey(co => co.Id);
    }
}


