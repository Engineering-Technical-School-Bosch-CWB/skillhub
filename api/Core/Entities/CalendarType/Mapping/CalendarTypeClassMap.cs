using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;
public class CalendarTypeClassMap : IEntityTypeConfiguration<CalendarType>
{
    public void Configure(EntityTypeBuilder<CalendarType> builder)
    {
        builder.HasKey(et => et.Id).HasName("PK____CalendarType");

        builder.ToTable("calendarType");

        builder.Property(et => et.Name)
            .HasMaxLength(55)
            .HasColumnName("name");
    }
}
