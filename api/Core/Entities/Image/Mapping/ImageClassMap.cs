using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Api.Domain.Models;

namespace Api.Core.Mapping;

public class ImageClassMap : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Image");

        builder.ToTable("image");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.Image_P)
            .HasColumnName("image_p")
            .HasColumnType("varbinary(max) filestream");

        builder.Property(e => e.Image_M)
            .HasColumnName("image_m")
            .HasColumnType("varbinary(max) filestream");
        
        builder.Property(e => e.Image_G)
            .HasColumnName("image_g")
            .HasColumnType("varbinary(max) filestream");

        builder.Property(u => u.FileGuid)
            .HasColumnName("file_guid")
            .HasColumnType("uniqueidentifier rowguidcol");
        
        builder.HasAlternateKey(u => u.FileGuid);
    }
}


