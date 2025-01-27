using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "occupation_area",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____OccupationArea", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "position",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    position_level = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Position", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sector",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Sector", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "subject_area",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____SubjectArea", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "course",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    default_occupation_area_id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    abbreviation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Course", x => x.id);
                    table.ForeignKey(
                        name: "FK_course_occupation_area_default_occupation_area_id",
                        column: x => x.default_occupation_area_id,
                        principalTable: "occupation_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    identification = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    birthday = table.Column<DateOnly>(type: "date", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    position_id = table.Column<int>(type: "int", nullable: false),
                    sector_id = table.Column<int>(type: "int", nullable: false),
                    occupation_area_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____User", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_occupation_area_occupation_area_id",
                        column: x => x.occupation_area_id,
                        principalTable: "occupation_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_position_position_id",
                        column: x => x.position_id,
                        principalTable: "position",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_sector_sector_id",
                        column: x => x.sector_id,
                        principalTable: "sector",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "curricular_unit",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    subject_area_id = table.Column<int>(type: "int", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____CurricularUnit", x => x.id);
                    table.ForeignKey(
                        name: "FK_curricular_unit_subject_area_subject_area_id",
                        column: x => x.subject_area_id,
                        principalTable: "subject_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "class",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    course_id = table.Column<int>(type: "int", nullable: false),
                    starting_year = table.Column<short>(type: "smallint", nullable: false),
                    duration_periods = table.Column<byte>(type: "tinyint", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Class", x => x.id);
                    table.ForeignKey(
                        name: "FK_class_course_course_id",
                        column: x => x.course_id,
                        principalTable: "course",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_image",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    file_guid = table.Column<Guid>(type: "uniqueidentifier rowguidcol", nullable: false),
                    image = table.Column<byte[]>(type: "varbinary(max) filestream", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "skill",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    evaluation_criteria = table.Column<string>(type: "varchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    curricular_unit_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Skill", x => x.id);
                    table.ForeignKey(
                        name: "FK_skill_curricular_unit_curricular_unit_id",
                        column: x => x.curricular_unit_id,
                        principalTable: "curricular_unit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    overall_score = table.Column<double>(type: "float", nullable: true),
                    overall_skill_score = table.Column<double>(type: "float", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Student", x => x.id);
                    table.ForeignKey(
                        name: "FK_student_class_class_id",
                        column: x => x.class_id,
                        principalTable: "class",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_student_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "subject",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    instructor_id = table.Column<int>(type: "int", nullable: false),
                    curricular_unit_id = table.Column<int>(type: "int", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    period = table.Column<byte>(type: "tinyint", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    duration_hours = table.Column<double>(type: "float", nullable: false),
                    began_at = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Subject", x => x.id);
                    table.ForeignKey(
                        name: "FK_subject_class_class_id",
                        column: x => x.class_id,
                        principalTable: "class",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_subject_curricular_unit_curricular_unit_id",
                        column: x => x.curricular_unit_id,
                        principalTable: "curricular_unit",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_subject_user_instructor_id",
                        column: x => x.instructor_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "exam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    applied_at = table.Column<DateOnly>(type: "date", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    instructor_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Exam", x => x.Id);
                    table.ForeignKey(
                        name: "FK_exam_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_exam_user_instructor_id",
                        column: x => x.instructor_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "feedback",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    instructor_id = table.Column<int>(type: "int", nullable: false),
                    student_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: true),
                    content = table.Column<string>(type: "varchar(max)", nullable: false),
                    created_at = table.Column<DateOnly>(type: "date", nullable: false),
                    student_may_visualize = table.Column<bool>(type: "bit", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Feedback", x => x.id);
                    table.ForeignKey(
                        name: "FK_feedback_student_student_id",
                        column: x => x.student_id,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_feedback_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_feedback_user_instructor_id",
                        column: x => x.instructor_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "post",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Post", x => x.id);
                    table.ForeignKey(
                        name: "FK_post_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "specific_objectives",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    identification = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    ressources = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    time = table.Column<int>(type: "int", nullable: false),
                    evaluation_criteria = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____SpecificObjectives", x => x.id);
                    table.ForeignKey(
                        name: "FK_specific_objectives_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "attachment",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    file_guid = table.Column<Guid>(type: "uniqueidentifier rowguidcol", nullable: false),
                    post_id = table.Column<int>(type: "int", nullable: false),
                    content = table.Column<byte[]>(type: "varbinary(max) filestream", nullable: false),
                    extension = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Attachment", x => x.id);
                    table.UniqueConstraint("AK_attachment_file_guid", x => x.file_guid);
                    table.ForeignKey(
                        name: "FK_attachment_post_post_id",
                        column: x => x.post_id,
                        principalTable: "post",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "objection",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    claimed_aptitude = table.Column<short>(type: "smallint", nullable: false),
                    official_aptitude = table.Column<short>(type: "smallint", nullable: false),
                    objected_at = table.Column<DateOnly>(type: "date", nullable: false),
                    is_accepted = table.Column<bool>(type: "bit", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    skill_result_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Objection", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "skill_result",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    aptitude = table.Column<short>(type: "smallint", nullable: true),
                    weight = table.Column<double>(type: "float", nullable: false),
                    evaluated_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: true),
                    exam_id = table.Column<int>(type: "int", nullable: true),
                    objection_id = table.Column<int>(type: "int", nullable: true),
                    skill_id = table.Column<int>(type: "int", nullable: false),
                    student_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____SkillResult", x => x.id);
                    table.ForeignKey(
                        name: "FK_skill_result_exam_exam_id",
                        column: x => x.exam_id,
                        principalTable: "exam",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_skill_result_objection_objection_id",
                        column: x => x.objection_id,
                        principalTable: "objection",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_skill_result_skill_skill_id",
                        column: x => x.skill_id,
                        principalTable: "skill",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_skill_result_student_student_id",
                        column: x => x.student_id,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_skill_result_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_attachment_post_id",
                table: "attachment",
                column: "post_id");

            migrationBuilder.CreateIndex(
                name: "IX_class_course_id",
                table: "class",
                column: "course_id");

            migrationBuilder.CreateIndex(
                name: "IX_course_default_occupation_area_id",
                table: "course",
                column: "default_occupation_area_id");

            migrationBuilder.CreateIndex(
                name: "IX_curricular_unit_subject_area_id",
                table: "curricular_unit",
                column: "subject_area_id");

            migrationBuilder.CreateIndex(
                name: "IX_exam_instructor_id",
                table: "exam",
                column: "instructor_id");

            migrationBuilder.CreateIndex(
                name: "IX_exam_subject_id",
                table: "exam",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_instructor_id",
                table: "feedback",
                column: "instructor_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_student_id",
                table: "feedback",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_feedback_subject_id",
                table: "feedback",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_objection_skill_result_id",
                table: "objection",
                column: "skill_result_id");

            migrationBuilder.CreateIndex(
                name: "IX_post_subject_id",
                table: "post",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_curricular_unit_id",
                table: "skill",
                column: "curricular_unit_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_exam_id",
                table: "skill_result",
                column: "exam_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_objection_id",
                table: "skill_result",
                column: "objection_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_skill_id",
                table: "skill_result",
                column: "skill_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_student_id",
                table: "skill_result",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_skill_result_subject_id",
                table: "skill_result",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_specific_objectives_subject_id",
                table: "specific_objectives",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_student_class_id",
                table: "student",
                column: "class_id");

            migrationBuilder.CreateIndex(
                name: "IX_student_user_id",
                table: "student",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_subject_class_id",
                table: "subject",
                column: "class_id");

            migrationBuilder.CreateIndex(
                name: "IX_subject_curricular_unit_id",
                table: "subject",
                column: "curricular_unit_id");

            migrationBuilder.CreateIndex(
                name: "IX_subject_instructor_id",
                table: "subject",
                column: "instructor_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_occupation_area_id",
                table: "user",
                column: "occupation_area_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_position_id",
                table: "user",
                column: "position_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_sector_id",
                table: "user",
                column: "sector_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_image_user_id",
                table: "user_image",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_objection_skill_result_skill_result_id",
                table: "objection",
                column: "skill_result_id",
                principalTable: "skill_result",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_class_course_course_id",
                table: "class");

            migrationBuilder.DropForeignKey(
                name: "FK_user_occupation_area_occupation_area_id",
                table: "user");

            migrationBuilder.DropForeignKey(
                name: "FK_curricular_unit_subject_area_subject_area_id",
                table: "curricular_unit");

            migrationBuilder.DropForeignKey(
                name: "FK_exam_subject_subject_id",
                table: "exam");

            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_subject_subject_id",
                table: "skill_result");

            migrationBuilder.DropForeignKey(
                name: "FK_exam_user_instructor_id",
                table: "exam");

            migrationBuilder.DropForeignKey(
                name: "FK_student_user_user_id",
                table: "student");

            migrationBuilder.DropForeignKey(
                name: "FK_skill_result_student_student_id",
                table: "skill_result");

            migrationBuilder.DropForeignKey(
                name: "FK_objection_skill_result_skill_result_id",
                table: "objection");

            migrationBuilder.DropTable(
                name: "attachment");

            migrationBuilder.DropTable(
                name: "feedback");

            migrationBuilder.DropTable(
                name: "specific_objectives");

            migrationBuilder.DropTable(
                name: "user_image");

            migrationBuilder.DropTable(
                name: "post");

            migrationBuilder.DropTable(
                name: "course");

            migrationBuilder.DropTable(
                name: "occupation_area");

            migrationBuilder.DropTable(
                name: "subject_area");

            migrationBuilder.DropTable(
                name: "subject");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "position");

            migrationBuilder.DropTable(
                name: "sector");

            migrationBuilder.DropTable(
                name: "student");

            migrationBuilder.DropTable(
                name: "class");

            migrationBuilder.DropTable(
                name: "skill_result");

            migrationBuilder.DropTable(
                name: "exam");

            migrationBuilder.DropTable(
                name: "objection");

            migrationBuilder.DropTable(
                name: "skill");

            migrationBuilder.DropTable(
                name: "curricular_unit");
        }
    }
}
