using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class ExamClassMap : IEntityTypeConfiguration<Exam>
{
    public void Configure(EntityTypeBuilder<Exam> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Exam");

        builder.ToTable("exam");

        builder.Property(e => e.Description)
            .HasMaxLength(255)
            .HasColumnName("description");

        builder.Property(e => e.AppliedAt)
            .HasColumnName("applied_at");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(e => e.Instructor)
            .WithMany()
            .HasForeignKey("instructor_id")
            .HasPrincipalKey(u => u.Id);

        builder.HasOne(e => e.Subject)
            .WithMany(s => s.Exams)
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

    }
}


