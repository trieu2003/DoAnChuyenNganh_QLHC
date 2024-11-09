using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_QLHC_DOAN.Migrations
{
    /// <inheritdoc />
    public partial class Databaseupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoaChat",
                columns: table => new
                {
                    MaHoaChat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoCAS = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenHoaChat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DonVi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CongThucHoaHoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NguyHiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLieuAnToan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThoiHanSuDung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HinhAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaChat", x => x.MaHoaChat);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoaChat");
        }
    }
}
