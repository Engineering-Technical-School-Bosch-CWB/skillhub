using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Core.Mapping;
public class EventMemberClassMap : IEntityTypeConfiguration<EventMember>
{
    public void Configure(EntityTypeBuilder<EventMember> builder)
    {
        builder.HasKey(et => et.Id).HasName("PK____EventMember");

        builder.ToTable("eventMember");

        builder.Property(em => em.Is_responsible).HasColumnName("is_responsible");
        
        builder.Property(em => em.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(e => e.Member)
        .WithMany(e => e.EventMembers)
        .HasForeignKey("member_id")
        .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(e => e.Event)
        .WithMany(e => e.EventMembers)
        .HasForeignKey("event_id")
        .OnDelete(DeleteBehavior.NoAction);

    }
}
