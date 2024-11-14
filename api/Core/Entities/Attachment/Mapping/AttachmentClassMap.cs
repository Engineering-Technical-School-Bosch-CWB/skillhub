using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class AttachmentClassMap : IEntityTypeConfiguration<Attachment>
{
    public void Configure(EntityTypeBuilder<Attachment> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Attachment");

        builder.ToTable("attachment");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.HasOne(a => a.Post)
            .WithMany(p => p.Attachments)
            .HasForeignKey("post_id")
            .HasPrincipalKey(p => p.Id);

        builder.Property(e => e.Content)
            .HasColumnName("content")
            .HasColumnType("varbinary(max) filestream");

        builder.Property(a => a.FileGuid)
            .HasColumnName("file_guid")
            .HasColumnType("uniqueidentifier rowguidcol");

        builder.Property(e => e.Extension)
            .HasMaxLength(10)
            .HasColumnName("extension");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");
    }
}


