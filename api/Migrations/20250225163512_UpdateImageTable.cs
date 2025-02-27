using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateImageTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "content",
                table: "image",
                newName: "image_p");

            migrationBuilder.AddColumn<byte[]>(
                name: "image_g",
                table: "image",
                type: "varbinary(max) filestream",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "image_m",
                table: "image",
                type: "varbinary(max) filestream",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image_g",
                table: "image");

            migrationBuilder.DropColumn(
                name: "image_m",
                table: "image");

            migrationBuilder.RenameColumn(
                name: "image_p",
                table: "image",
                newName: "content");
        }
    }
}
