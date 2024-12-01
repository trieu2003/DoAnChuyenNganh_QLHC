using Microsoft.EntityFrameworkCore.Migrations;

namespace API_QLHC_DOAN.Migrations
{
    public partial class FixPhieuThanhLyStructure : Migration
    {
        // Phương thức Up sẽ áp dụng các thay đổi vào cơ sở dữ liệu
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Thêm cột MaHoaChat vào bảng PhieuThanhLy
            migrationBuilder.AddColumn<int>(
                name: "MaHoaChat",
                table: "PhieuThanhLy",
                nullable: true);

            // Nếu muốn thêm các mối quan hệ (foreign keys) hoặc sửa bảng, bạn có thể thêm vào đây
            migrationBuilder.AddForeignKey(
                name: "FK_PhieuThanhLy_HoaChat_MaHoaChat",
                table: "PhieuThanhLy",
                column: "MaHoaChat",
                principalTable: "HoaChat",
                principalColumn: "MaHoaChat",
                onDelete: ReferentialAction.Restrict);  // Cách hành động khi xóa, có thể là CASCADE, SET NULL, v.v.
        }

        // Phương thức Down sẽ hoàn tác các thay đổi trong Up
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Xóa cột MaHoaChat từ bảng PhieuThanhLy
            migrationBuilder.DropColumn(
                name: "MaHoaChat",
                table: "PhieuThanhLy");

            // Nếu bạn đã thêm khóa ngoại, xóa nó tại đây
            migrationBuilder.DropForeignKey(
                name: "FK_PhieuThanhLy_HoaChat_MaHoaChat",
                table: "PhieuThanhLy");
        }
    }
}
