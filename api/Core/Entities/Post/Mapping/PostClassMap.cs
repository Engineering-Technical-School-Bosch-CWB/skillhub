using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class PostClassMap : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Post");

        builder.ToTable("post");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.HasOne(p => p.Subject)
            .WithMany(s => s.Posts)
            .HasForeignKey("subject_id")
            .HasPrincipalKey(s => s.Id);

        builder.Property(e => e.Title)
            .HasMaxLength(255)
            .HasColumnName("title");
        
        builder.Property(e => e.Body)
            .HasColumnName("body");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

    }
}


