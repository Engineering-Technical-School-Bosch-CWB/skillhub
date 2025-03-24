using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;

public class EventClassMap : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Event");

        builder.ToTable("event");

        builder.Property(e => e.Name)
            .HasMaxLength(55)
            .HasColumnName("name");
        
        builder.Property(e => e.Description)
            .HasMaxLength(255)
            .HasColumnName("description");
        
        builder.HasMany(e => e.CalendarEvents)
            .WithOne(ce => ce.Event)
            .HasForeignKey("calendar_event_id")
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(e => e.EventType)
            .WithMany(et => et.Events)
            .HasForeignKey("event_type_id")
            .OnDelete(DeleteBehavior.NoAction);
        
        
    }
}