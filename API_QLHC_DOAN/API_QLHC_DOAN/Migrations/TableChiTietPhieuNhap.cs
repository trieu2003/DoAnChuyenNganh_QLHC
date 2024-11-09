using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_QLHC_DOAN.Migrations
{
    /// <inheritdoc />
    public partial class mssqlonprem_migration_305 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChiTietDeXuat",
                columns: table => new
                {
                    MaPhieuDX = table.Column<int>(type: "int", nullable: false),
                    MaHoaChat = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDeXuat", x => new { x.MaPhieuDX, x.MaHoaChat });
                    table.ForeignKey(
                        name: "FK_ChiTietDeXuat_HoaChat_MaHoaChat",
                        column: x => x.MaHoaChat,
                        principalTable: "HoaChat",
                        principalColumn: "MaHoaChat",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietDeXuat_PhieuDeXuat_MaPhieuDX",
                        column: x => x.MaPhieuDX,
                        principalTable: "PhieuDeXuat",
                        principalColumn: "MaPhieuDX",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDeXuat_MaHoaChat",
                table: "ChiTietDeXuat",
                column: "MaHoaChat");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietDeXuat");
        }
    }
}
