using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class FeedbackClassMap : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Feedback");

        builder.ToTable("feedback");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Content)
            .HasColumnName("content");

        builder.Property(e => e.CreatedAt)
            .HasColumnName("created_at");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.StudentId)
            .HasColumnName("student_id");

        builder.Property(e => e.InstructorId)
            .HasColumnName("instructor_id");

    }
}


