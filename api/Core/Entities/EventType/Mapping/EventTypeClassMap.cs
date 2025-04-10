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
        
        builder.Property(et => et.IsActive)
            .HasColumnName("is_active");

        builder.Property(et => et.Name)
            .HasMaxLength(55)
            .HasColumnName("name");

            builder.Property(et => et.AllDay)
                .HasColumnName("all_day");

            builder.Property(et => et.Saturday)
                .HasColumnName("saturday");

            builder.Property(et => et.DisableDay)
                .HasColumnName("disable_day");

            builder.Property(et => et.AllClasses)
                .HasColumnName("all_classes");

            builder.Property(et => et.Icon)
                .HasColumnType("NVARCHAR(MAX)")
                .HasColumnName("icon");

            builder.Property(et => et.Color)
                .HasColumnType("NVARCHAR(8)")
                .HasColumnName("color");

    }
}
