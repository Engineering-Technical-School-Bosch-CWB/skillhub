using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;
public class CalendarClassMap : IEntityTypeConfiguration<Calendar>
{
    public void Configure(EntityTypeBuilder<Calendar> builder)
    {
        builder.HasKey(c => c.Id).HasName("PK____Calendar");

        builder.ToTable("calendar");

        builder.Property(c => c.Day)
        .HasColumnName("day");

        builder.Property(c => c.Period)
        .HasColumnName("period");

        builder.HasMany(c => c.CalendarEvents)
        .WithOne(ce => ce.Calendar)
        .OnDelete(DeleteBehavior.NoAction)
        .HasPrincipalKey(u => u.Id);

        builder.HasOne(c => c.CalendarType)
        .WithMany(ct => ct.Calendars)
        .OnDelete(DeleteBehavior.NoAction);
    }
}
