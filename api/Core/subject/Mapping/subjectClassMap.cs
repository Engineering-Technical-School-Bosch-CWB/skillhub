using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SubjectClassMap : IEntityTypeConfiguration<Subject>
{
    public void Configure(EntityTypeBuilder<Subject> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Subject");

        builder.ToTable("subject");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.InstructorId)
            .HasColumnName("instructor_id");

        builder.Property(e => e.CurricularUnitId)
            .HasColumnName("curricular_unit_id");

        builder.Property(e => e.ClassId)
            .HasColumnName("class_id");

    }
}


