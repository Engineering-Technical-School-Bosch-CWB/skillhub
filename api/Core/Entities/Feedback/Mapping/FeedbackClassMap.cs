using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class FeedbackClassMap : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.HasKey(f => f.Id).HasName("PK____Feedback");

        builder.ToTable("feedback");

        builder.Property(f => f.Id)
            .HasColumnName("id");

        builder.HasOne(f => f.Instructor)
            .WithMany()
            .HasForeignKey("instructor_id")
            .OnDelete(DeleteBehavior.NoAction)
            .HasPrincipalKey(u => u.Id);

        builder.HasOne(f => f.Student)
            .WithMany(s => s.Feedbacks)
            .HasForeignKey("student_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(f => f.Subject)
            .WithMany()
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

        builder.Property(f => f.Content)
            .HasColumnType("varchar(max)")
            .HasColumnName("content");

        builder.Property(f => f.CreatedAt)
            .HasColumnName("created_at");

        builder.Property(f => f.StudentMayVisualize)
            .HasColumnName("student_may_visualize");

        builder.Property(f => f.IsActive)
            .HasColumnName("is_active");
    }
}


