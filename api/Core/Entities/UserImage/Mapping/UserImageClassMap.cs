using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class UserImageClassMap : IEntityTypeConfiguration<UserImage>
{
    public void Configure(EntityTypeBuilder<UserImage> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____UserImage");

        builder.ToTable("user_image");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Image)
            .HasColumnName("image")
            .HasColumnType("varbinary(max) filestream");

        builder.Property(u => u.FileGuid)
            .HasColumnName("file_guid")
            .HasColumnType("uniqueidentifier rowguidcol");
        
        builder.HasAlternateKey(u => u.FileGuid);

        builder.HasOne(i => i.User)
            .WithMany(u => u.Images)
            .HasForeignKey("user_id")
            .HasPrincipalKey(u => u.Id);
    }
}


