using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class CurricularUnitClassMap : IEntityTypeConfiguration<CurricularUnit>
{
    public void Configure(EntityTypeBuilder<CurricularUnit> builder)
    {
        builder.HasKey(c => c.Id).HasName("PK____CurricularUnit");

        builder.ToTable("curricular_unit");

        builder.Property(c => c.Id)
            .HasColumnName("id");

        builder.Property(c => c.Name)
            .HasMaxLength(255)
            .HasColumnName("name");

        builder.HasOne(c => c.SubjectArea)
            .WithMany(s => s.CurricularUnits)
            .HasForeignKey("subject_area_id")
            .HasPrincipalKey(s => s.Id);

        builder.Property(c => c.IsActive)
            .HasColumnName("is_active");

        builder.HasMany(c => c.Skills)
            .WithOne(s => s.CurricularUnit);
    }
}


