using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class CurricularUnitClassMap : IEntityTypeConfiguration<CurricularUnit>
{
    public void Configure(EntityTypeBuilder<CurricularUnit> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____CurricularUnit");

        builder.ToTable("curricular_unit");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.Property(e => e.Duration)
            .HasColumnName("duration");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.CourseId)
            .HasColumnName("course_id");

        builder.Property(e => e.SubjectAreaId)
            .HasColumnName("subject_area_id");

    }
}


