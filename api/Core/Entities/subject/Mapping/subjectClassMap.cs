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
<<<<<<< HEAD

        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .HasColumnName("name");
=======
        
        builder.HasOne(s => s.Instructor)
            .WithMany(u => u.Subjects)
            .HasForeignKey("instructor_id")
            .OnDelete(DeleteBehavior.NoAction)
            .HasPrincipalKey(u => u.Id);

        builder.HasOne(s => s.CurricularUnit)
            .WithMany(cu => cu.Subjects)
            .HasForeignKey("curricular_unit_id")
            .HasPrincipalKey(cu => cu.Id);

        builder.HasOne(s => s.Class)
            .WithMany(c => c.Subjects)
            .HasForeignKey("class_id")
            .HasPrincipalKey(c => c.Id);

        builder.Property(s => s.Period)
            .HasColumnType("tinyint")
            .HasColumnName("period");
>>>>>>> dev

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

<<<<<<< HEAD
        builder.Property(e => e.InstructorId)
            .HasColumnName("instructor_id");

        builder.Property(e => e.CurricularUnitId)
            .HasColumnName("curricular_unit_id");

        builder.Property(e => e.ClassId)
            .HasColumnName("class_id");

=======
        builder.Property(e => e.DurationHours)
            .HasColumnName("duration_hours");

        builder.Property(e => e.BeganAt)
            .HasColumnName("began_at");
>>>>>>> dev
    }
}


