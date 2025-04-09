using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixedIsActiveFieldNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "eventType",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "eventMember",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "classEvent",
                newName: "is_active");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "eventType",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "eventMember",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "classEvent",
                newName: "IsActive");
        }
    }
}
