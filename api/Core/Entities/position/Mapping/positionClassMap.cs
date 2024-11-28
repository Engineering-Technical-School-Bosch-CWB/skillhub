using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class PositionClassMap : IEntityTypeConfiguration<Position>
{
    public void Configure(EntityTypeBuilder<Position> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Position");

        builder.ToTable("position");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(100)
            .HasColumnName("name");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

            builder.Property(e => e.PositionLevel)
            .HasColumnType("tinyint")
            .HasColumnName("position_level");
    }
}


