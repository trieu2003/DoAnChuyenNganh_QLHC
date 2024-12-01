using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

public partial class CreatePhieuThanhLyTable : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "PhieuThanhLy",
            columns: table => new
            {
                MaPhieuTL = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                LyDo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                TrangThai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                PhuongThucThanhLy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false),
                MaNguoiDung = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_PhieuThanhLy", x => x.MaPhieuTL);
                table.ForeignKey(
                    name: "FK_PhieuThanhLy_NguoiDung",
                    column: x => x.MaNguoiDung,
                    principalTable: "NguoiDung",
                    principalColumn: "MaNguoiDung",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_PhieuThanhLy_MaNguoiDung",
            table: "PhieuThanhLy",
            column: "MaNguoiDung");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "PhieuThanhLy");
    }
}
