using Microsoft.EntityFrameworkCore; // Thêm thư viện Entity Framework Core

namespace BE_DOAN_QLHC.Data
{
    public class QLHCContext : DbContext // Kế thừa từ DbContext
    {
        // Constructor để truyền các option vào DbContext
        public QLHCContext(DbContextOptions<QLHCContext> options) : base(options) { }

        // Các DbSet tương ứng với các bảng trong cơ sở dữ liệu
        public DbSet<NguoiDung> NguoiDung { get; set; }
        public DbSet<PhieuThanhLy> PhieuThanhLy { get; set; }
        public DbSet<DuyetPhieuTL> DuyetPhieuTL { get; set; }
        public DbSet<MonHoc> MonHoc { get; set; }
        public DbSet<LopHocPhan> LopHocPhan { get; set; }
        public DbSet<PhieuPhanBo> PhieuPhanBo { get; set; }
        public DbSet<PhieuDeXuat> PhieuDeXuat { get; set; }
        public DbSet<DuyetPhieuDX> DuyetPhieuDX { get; set; }
        public DbSet<HoaChat> HoaChat { get; set; }
        public DbSet<ChiTietDeXuat> ChiTietDeXuat { get; set; }
        public DbSet<PhieuNhap> PhieuNhap { get; set; }
        public DbSet<LoHoaChat> LoHoaChat { get; set; }
        public DbSet<ChiTietPhanBo> ChiTietPhanBo { get; set; }
        public DbSet<BaiThiNghiem> BaiThiNghiem { get; set; }
        public DbSet<DuTru> DuTru { get; set; }

        // OnModelCreating để cấu hình các mối quan hệ (nếu cần)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ví dụ cấu hình các khóa chính kết hợp nếu có (Composite Keys)
            modelBuilder.Entity<ChiTietDeXuat>()
                .HasKey(cd => new { cd.MaPhieuDX, cd.MaHoaChat });

            modelBuilder.Entity<DuyetPhieuDX>()
                .HasKey(dp => new { dp.MaPhieuDX, dp.MaNguoiDung });

            modelBuilder.Entity<DuyetPhieuTL>()
                .HasKey(dp => new { dp.MaPhieuTL, dp.MaNguoiDung });

            modelBuilder.Entity<ChiTietPhanBo>()
                .HasKey(cp => new { cp.MaPhieuPB, cp.MaLo });

            modelBuilder.Entity<DuTru>()
                .HasKey(dt => new { dt.MaHoaChat, dt.MaBaiTN });
        }
    }
}
