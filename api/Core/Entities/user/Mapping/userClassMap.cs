using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class UserClassMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id).HasName("PK____User");

        builder.ToTable("user");

        builder.Property(u => u.Id)
            .HasColumnName("id");

        builder.Property(u => u.Name)
            .HasMaxLength(500)
            .HasColumnName("name");

        builder.Property(u => u.Identification)
            .HasMaxLength(100)
            .HasColumnName("identification");

        builder.Property(u => u.Hash)
            .HasMaxLength(255)
            .HasColumnName("hash");

        builder.Property(u => u.Birthday)
            .HasColumnName("birthday");

        builder.Property(u => u.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(u => u.Position)
            .WithMany(p => p.Users)
            .HasForeignKey("position_id")
            .HasPrincipalKey(p => p.Id);
        
        builder.HasOne(u => u.Sector)
            .WithMany(s => s.Users)
            .HasForeignKey("sector_id")
            .HasPrincipalKey(s => s.Id);

        builder.HasOne(u => u.Area)
            .WithMany(a => a.Users)
            .HasForeignKey("occupation_area_id")
            .HasPrincipalKey(a => a.Id);

        builder.HasOne(u => u.Student)
            .WithOne(s => s.User)
            .HasForeignKey("student_id");
    }
}


