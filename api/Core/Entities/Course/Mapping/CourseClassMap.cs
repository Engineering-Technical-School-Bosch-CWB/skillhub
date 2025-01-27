using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Api.Domain.Models;
namespace Api.Core.Mapping;

public class CourseClassMap : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(e => e.Id).HasName("PK____Course");

        builder.ToTable("course");

        builder.Property(e => e.Id)
            .HasColumnName("id");
        
        builder.HasOne( c => c.DefaultOccupationArea)
            .WithMany(oa => oa.Courses)
            .HasForeignKey("default_occupation_area_id")
            .HasPrincipalKey(oa => oa.Id);

        builder.Property(e => e.Abbreviation)
            .HasMaxLength(50)
            .HasColumnName("abbreviation");
            
        builder.Property(u => u.IsActive)
            .HasColumnName("is_active");

        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .HasColumnName("name");
    }
}


