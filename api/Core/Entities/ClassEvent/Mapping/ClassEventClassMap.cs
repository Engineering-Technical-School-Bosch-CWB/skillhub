using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;

public class ClassEventClassMap : IEntityTypeConfiguration<ClassEvent>
{
    public void Configure(EntityTypeBuilder<ClassEvent> builder)
    {
        builder.HasKey(cle => cle.Id).HasName("PK____ClassEvent");

        builder.ToTable("classEvent");

        builder.HasOne(cle => cle.Event)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("event_id")
        .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(cle => cle.Classe)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("class_id")
        .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(cle => cle.Subject)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("subject_id")
        .OnDelete(DeleteBehavior.NoAction);
    }
}
