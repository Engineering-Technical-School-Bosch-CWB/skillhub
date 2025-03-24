using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;
public class CalendarEventClassMap : IEntityTypeConfiguration<CalendarEvent>
{
    public void Configure(EntityTypeBuilder<CalendarEvent> builder)
    {
        builder.HasKey(ce => ce.Id).HasName("PK____CalendarEvent");

        builder.ToTable("calendarEvent");

        builder.HasOne(ce => ce.Calendar)
            .WithMany(c => c.CalendarEvents)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(ce => ce.Event)
            .WithMany(e => e.CalendarEvents)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Property(ce => ce.Note)
            .HasColumnName("note");

        builder.Property(ce => ce.Movable)
            .HasColumnName("movable");
    }
}
