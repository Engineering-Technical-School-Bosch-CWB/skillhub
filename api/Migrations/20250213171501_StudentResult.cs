using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class StudentResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "student_result",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    student_id = table.Column<int>(type: "int", nullable: false),
                    score = table.Column<double>(type: "float", nullable: true),
                    skill_score = table.Column<double>(type: "float", nullable: true),
                    exam_id = table.Column<int>(type: "int", nullable: true),
                    subject_id = table.Column<int>(type: "int", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____StudentResult", x => x.id);
                    table.ForeignKey(
                        name: "FK_student_result_exam_exam_id",
                        column: x => x.exam_id,
                        principalTable: "exam",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_student_result_student_student_id",
                        column: x => x.student_id,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_student_result_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_student_result_exam_id",
                table: "student_result",
                column: "exam_id");

            migrationBuilder.CreateIndex(
                name: "IX_student_result_student_id",
                table: "student_result",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_student_result_subject_id",
                table: "student_result",
                column: "subject_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "student_result");
        }
    }
}
