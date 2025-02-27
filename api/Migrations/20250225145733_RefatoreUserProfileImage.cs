using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RefatoreUserProfileImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_image");

            migrationBuilder.AddColumn<int>(
                name: "profile_picture_id",
                table: "user",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "image",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    file_guid = table.Column<Guid>(type: "uniqueidentifier rowguidcol", nullable: false),
                    content = table.Column<byte[]>(type: "varbinary(max) filestream", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Image", x => x.id);
                    table.UniqueConstraint("AK_image_file_guid", x => x.file_guid);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_profile_picture_id",
                table: "user",
                column: "profile_picture_id");

            migrationBuilder.AddForeignKey(
                name: "FK_user_image_profile_picture_id",
                table: "user",
                column: "profile_picture_id",
                principalTable: "image",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_image_profile_picture_id",
                table: "user");

            migrationBuilder.DropTable(
                name: "image");

            migrationBuilder.DropIndex(
                name: "IX_user_profile_picture_id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "profile_picture_id",
                table: "user");

            migrationBuilder.CreateTable(
                name: "user_image",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    file_guid = table.Column<Guid>(type: "uniqueidentifier rowguidcol", nullable: false),
                    image = table.Column<byte[]>(type: "varbinary(max) filestream", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____UserImage", x => x.id);
                    table.UniqueConstraint("AK_user_image_file_guid", x => x.file_guid);
                    table.ForeignKey(
                        name: "FK_user_image_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_image_user_id",
                table: "user_image",
                column: "user_id");
        }
    }
}
