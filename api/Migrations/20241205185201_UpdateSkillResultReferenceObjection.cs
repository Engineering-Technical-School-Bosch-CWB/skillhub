using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSkillResultReferenceObjection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ObjectionId",
                table: "skill_result",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_ObjectionId",
                table: "skill_result",
                column: "ObjectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_objection_ObjectionId",
                table: "skill_result",
                column: "ObjectionId",
                principalTable: "objection",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_objection_ObjectionId",
                table: "skill_result");

            migrationBuilder.DropIndex(
                name: "IX_skill_result_ObjectionId",
                table: "skill_result");

            migrationBuilder.DropColumn(
                name: "ObjectionId",
                table: "skill_result");
        }
    }
}
