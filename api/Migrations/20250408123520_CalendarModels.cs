using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CalendarModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "finished_at",
                table: "subject",
                type: "date",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "eventType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    all_day = table.Column<bool>(type: "bit", nullable: false),
                    saturday = table.Column<bool>(type: "bit", nullable: false),
                    disable_day = table.Column<bool>(type: "bit", nullable: false),
                    all_classes = table.Column<bool>(type: "bit", nullable: false),
                    icon = table.Column<string>(type: "NVARCHAR(MAX)", nullable: false),
                    color = table.Column<string>(type: "NVARCHAR(8)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____EventType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "event",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(55)", maxLength: 55, nullable: false),
                    description = table.Column<string>(type: "NVARCHAR(255)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    movable = table.Column<bool>(type: "bit", nullable: false),
                    start_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    end_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    event_type_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____Event", x => x.Id);
                    table.ForeignKey(
                        name: "FK_event_eventType_event_type_id",
                        column: x => x.event_type_id,
                        principalTable: "eventType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "classEvent",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: true),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    event_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____ClassEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_classEvent_class_class_id",
                        column: x => x.class_id,
                        principalTable: "class",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_classEvent_event_event_id",
                        column: x => x.event_id,
                        principalTable: "event",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_classEvent_subject_subject_id",
                        column: x => x.subject_id,
                        principalTable: "subject",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "eventMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    is_responsible = table.Column<bool>(type: "bit", nullable: false),
                    member_id = table.Column<int>(type: "int", nullable: false),
                    event_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK____EventMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_eventMember_event_event_id",
                        column: x => x.event_id,
                        principalTable: "event",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_eventMember_user_member_id",
                        column: x => x.member_id,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_classEvent_class_id",
                table: "classEvent",
                column: "class_id");

            migrationBuilder.CreateIndex(
                name: "IX_classEvent_event_id",
                table: "classEvent",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_classEvent_subject_id",
                table: "classEvent",
                column: "subject_id");

            migrationBuilder.CreateIndex(
                name: "IX_event_event_type_id",
                table: "event",
                column: "event_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_eventMember_event_id",
                table: "eventMember",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_eventMember_member_id",
                table: "eventMember",
                column: "member_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "classEvent");

            migrationBuilder.DropTable(
                name: "eventMember");

            migrationBuilder.DropTable(
                name: "event");

            migrationBuilder.DropTable(
                name: "eventType");

            migrationBuilder.DropColumn(
                name: "finished_at",
                table: "subject");
        }
    }
}
