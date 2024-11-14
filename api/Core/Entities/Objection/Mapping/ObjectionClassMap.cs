using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class ObjectionClassMap : IEntityTypeConfiguration<Objection>
{
    public void Configure(EntityTypeBuilder<Objection> builder)
    {
        builder.HasKey(o => o.Id).HasName("PK____Objection");

        builder.ToTable("objection");

        builder.Property(o => o.Id)
            .HasColumnName("id");

        builder.Property(o => o.ClaimedAptitude)
            .HasColumnName("claimed_aptitude");

        builder.Property(o => o.OfficialAptitude)
            .HasColumnName("official_aptitude");

        builder.Property(o => o.ObjectedAt)
            .HasColumnName("objected_at");

        builder.Property(o => o.IsAccepted)
            .HasColumnName("is_accepted");

        builder.Property(o => o.IsActive)
            .HasColumnName("is_active");

        builder.HasOne(o => o.SkillResult)
            .WithMany(s => s.Objections)
            .HasForeignKey("skill_result_id")
            .HasPrincipalKey(s => s.Id);
    }
}


