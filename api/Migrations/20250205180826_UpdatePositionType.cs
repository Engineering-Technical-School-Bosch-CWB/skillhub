using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePositionType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "position_level",
                table: "position",
                newName: "position_type");

            migrationBuilder.AddColumn<byte>(
                name: "permission_level",
                table: "position",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "permission_level",
                table: "position");

            migrationBuilder.RenameColumn(
                name: "position_type",
                table: "position",
                newName: "position_level");
        }
    }
}
