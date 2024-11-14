using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SubjectAreaClassMap : IEntityTypeConfiguration<SubjectArea>
{
    public void Configure(EntityTypeBuilder<SubjectArea> builder)
    {
        builder.HasKey(s => s.Id).HasName("PK____SubjectArea");

        builder.ToTable("subject_area");

        builder.Property(s => s.Id)
            .HasColumnName("id");

        builder.Property(s => s.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.Property(s => s.IsActive)
            .HasColumnName("is_active");

        builder.HasMany(s => s.CurricularUnits)
            .WithOne(c => c.SubjectArea);

    }
}


