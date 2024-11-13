using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class OccupationAreaClassMap : IEntityTypeConfiguration<OccupationArea>
{
    public void Configure(EntityTypeBuilder<OccupationArea> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____OccupationArea");

        builder.ToTable("occupation_area");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(100)
            .HasColumnName("name");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");
    }
}


