using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SubjectAreaClassMap : IEntityTypeConfiguration<SubjectArea>
{
    public void Configure(EntityTypeBuilder<SubjectArea> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____SubjectArea");

        builder.ToTable("subject_area");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

    }
}


