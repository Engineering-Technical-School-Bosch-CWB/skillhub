using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Domain.Models;
namespace api.Core.Mapping;

public class UserImageClassMap : IEntityTypeConfiguration<UserImage>
{
    public void Configure(EntityTypeBuilder<UserImage> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____UserImage");

        builder.ToTable("user_image");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Image)
            .HasColumnName("image");

        builder.Property(e => e.UserId)
            .HasColumnName("user_id");

    }
}


