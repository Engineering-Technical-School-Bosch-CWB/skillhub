using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSkillResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_student_StudentId",
                table: "skill_result");

            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_subject_student_id",
                table: "skill_result");

            migrationBuilder.DropIndex(
                name: "IX_skill_result_StudentId",
                table: "skill_result");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "skill_result");

            migrationBuilder.AlterColumn<int>(
                name: "student_id",
                table: "skill_result",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_subject_id",
                table: "skill_result",
                column: "subject_id");

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_student_student_id",
                table: "skill_result",
                column: "student_id",
                principalTable: "student",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_subject_subject_id",
                table: "skill_result",
                column: "subject_id",
                principalTable: "subject",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_student_student_id",
                table: "skill_result");

            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_subject_subject_id",
                table: "skill_result");

            migrationBuilder.DropIndex(
                name: "IX_skill_result_subject_id",
                table: "skill_result");

            migrationBuilder.AlterColumn<int>(
                name: "student_id",
                table: "skill_result",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "skill_result",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_StudentId",
                table: "skill_result",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_student_StudentId",
                table: "skill_result",
                column: "StudentId",
                principalTable: "student",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_skill_result_subject_student_id",
                table: "skill_result",
                column: "student_id",
                principalTable: "subject",
                principalColumn: "id");
        }
    }
}
