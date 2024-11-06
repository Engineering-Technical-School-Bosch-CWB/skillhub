using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Domain.Models;
namespace api.Core.Mapping;

public class CompetenceClassMap : IEntityTypeConfiguration<Competence>
{
    public void Configure(EntityTypeBuilder<Competence> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Competence");

        builder.ToTable("competence");

        builder.Property(e => e.Id)
            .HasColumnName("id");

        builder.Property(e => e.Description)
            .HasMaxLength(255)
            .HasColumnName("description");

        builder.Property(e => e.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.SubjectId)
            .HasColumnName("subject_id");

    }
}


