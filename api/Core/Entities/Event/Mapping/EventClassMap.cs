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
            .HasColumnType("NVARCHAR(255)")
            .HasColumnName("description");
        
        builder.Property(e => e.Is_active)
            .HasColumnName("is_active");

        builder.Property(e => e.Movable)
            .HasColumnName("movable");

        builder.Property(e => e.Start_date)
            .HasColumnName("start_date");

        builder.Property(e => e.End_date)
            .HasColumnName("end_date");

        builder.HasOne(e => e.EventType)
            .WithMany(et => et.Events)
            .HasForeignKey("event_type_id")
            .OnDelete(DeleteBehavior.NoAction);
        
        
    }
}