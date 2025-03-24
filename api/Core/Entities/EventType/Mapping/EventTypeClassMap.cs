using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;
public class EventTypeClassMap : IEntityTypeConfiguration<EventType>
{
    public void Configure(EntityTypeBuilder<EventType> builder)
    {
        builder.HasKey(et => et.Id).HasName("PK____EventType");

        builder.ToTable("eventType");
        
        builder.HasMany(et => et.CalendarTypes)
            .WithMany(ct => ct.EventTypes)
            .UsingEntity("eventRestriction");

        builder.Property(et => et.Name)
            .HasMaxLength(55)
            .HasColumnName("name");
    }
}
