using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSkillResultRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_objection_ObjectionId",
                table: "skill_result");

            migrationBuilder.RenameColumn(
                name: "ObjectionId",
                table: "skill_result",
                newName: "objection_id");

            migrationBuilder.RenameIndex(
                name: "IX_skill_result_ObjectionId",
                table: "skill_result",
                newName: "IX_skill_result_objection_id");

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_objection_objection_id",
                table: "skill_result",
                column: "objection_id",
                principalTable: "objection",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_objection_objection_id",
                table: "skill_result");

            migrationBuilder.RenameColumn(
                name: "objection_id",
                table: "skill_result",
                newName: "ObjectionId");

            migrationBuilder.RenameIndex(
                name: "IX_skill_result_objection_id",
                table: "skill_result",
                newName: "IX_skill_result_ObjectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_objection_ObjectionId",
                table: "skill_result",
                column: "ObjectionId",
                principalTable: "objection",
                principalColumn: "id");
        }
    }
}
