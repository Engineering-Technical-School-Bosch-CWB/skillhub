using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class SectorClassMap : IEntityTypeConfiguration<Sector>
{
    public void Configure(EntityTypeBuilder<Sector> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Sector");

        builder.ToTable("sector");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(100)
            .HasColumnName("name");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");
    }
}


