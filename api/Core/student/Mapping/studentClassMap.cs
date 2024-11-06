using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Domain.Models;
namespace api.Core.Mapping;

public class StudentClassMap : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Student");

        builder.ToTable("student");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Grade)
            .HasColumnName("grade");

        builder.Property(e => e.PersonalFeedback)
            .HasColumnName("personal_feedback");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.UserId)
            .HasColumnName("user_id");

        builder.Property(e => e.ClassId)
            .HasColumnName("class_id");

    }
}


