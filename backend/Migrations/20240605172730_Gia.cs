using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QLBooking.Migrations
{
    /// <inheritdoc />
    public partial class Gia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gia",
                table: "Tour",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gia",
                table: "Tour");
        }
    }
}
