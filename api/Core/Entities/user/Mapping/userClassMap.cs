using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class UserClassMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____User");

        builder.ToTable("user");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Name)
            .HasMaxLength(500)
            .HasColumnName("name");

        builder.Property(e => e.Identification)
            .HasMaxLength(100)
            .HasColumnName("identification");

        builder.Property(e => e.Hash)
            .HasMaxLength(255)
            .HasColumnName("hash");

        builder.Property(e => e.Card)
            .HasMaxLength(10)
            .HasColumnName("card");

        builder.Property(e => e.Birthday)
            .HasColumnName("birthday");

        builder.Property(e => e.NewUser)
            .HasColumnName("new_user");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.PositionId)
            .HasColumnName("position_id");

        builder.Property(e => e.SectorId)
            .HasColumnName("sector_id");

        builder.Property(e => e.OccupationId)
            .HasColumnName("occupation_id");

    }
}


