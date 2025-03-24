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

        builder.HasOne(cle => cle.Events)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("event_id")
        .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(cle => cle.Classes)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("class_id")
        .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(cle => cle.Subjects)
        .WithMany(e => e.ClassEvents)
        .HasForeignKey("subject_id")
        .OnDelete(DeleteBehavior.NoAction);
    }
}
