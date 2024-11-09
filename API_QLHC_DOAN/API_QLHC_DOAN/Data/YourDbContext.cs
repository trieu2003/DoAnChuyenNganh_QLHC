using API_QLHC_DOAN.Models;
using Microsoft.EntityFrameworkCore;
using System;
namespace API_QLHC_DOAN.Data
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }
        // Chú ý đặt đúng tên bảng

        // Thêm bảng người dùng
        public DbSet<NguoiDung> NguoiDung { get; set; }
        //Thêm bảng lô hóa chất
        public DbSet<LoHoaChat> LoHoaChat { get; set; }
        // Thêm bảng hóa chất
        public DbSet<HoaChat> HoaChat { get; set; }
        // Thêm bảng phiếu đề xuất
        public DbSet<PhieuDeXuat> PhieuDeXuat { get; set; }
        // Thêm bảng chi tiết phiếu đề xuất
        public DbSet<ChiTietDeXuat> ChiTietDeXuat { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChiTietDeXuat>()
                .HasKey(ct => new { ct.MaPhieuDX, ct.MaHoaChat }); // Định nghĩa khóa chính phức hợp
        }

    }
}
