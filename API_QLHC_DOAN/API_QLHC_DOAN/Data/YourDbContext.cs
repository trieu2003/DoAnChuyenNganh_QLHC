using API_QLHC_DOAN.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
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
        //Thêm bảng phiếu nhập
        public DbSet<PhieuNhap> PhieuNhap { get; set; }
        // Thêm bảng phiếu phân bổ
        public DbSet<PhieuPhanBo> PhieuPhanBo { get; set; }

        // Thêm bảng chi tiết phân bổ
        public DbSet<ChiTietPhanBo> ChiTietPhanBo { get; set; }

        // Thêm bảng lớp học phần
        public DbSet<LopHocPhan> LopHocPhan { get; set; }

        // Thêm bảng phiếu đề xuất
        public DbSet<PhieuDeXuat> PhieuDeXuat { get; set; }
        // Thêm bảng chi tiết phiếu đề xuất
        public DbSet<ChiTietDeXuat> ChiTietDeXuat { get; set; }
        public DbSet<DuyetPhieuDX> DuyetPhieuDX { get; set; }
        public DbSet<PhieuThanhLy> PhieuThanhLy { get; set; }

        public DbSet<DuyetPhieuTL> DuyetPhieuTL { get; set; }
        // Thêm DbSet cho dữ liệu trả về
        public DbSet<PhieuThanhLyDetails> PhieuThanhLyDetails { get; set; }
        public DbSet<BaiThiNghiem> BaiThiNghiem { get; set; }
        public DbSet<DuTru> DuTru { get; set; }
        public DbSet<MonHoc> MonHoc { get; set; }
        public DbSet<DuyetDuTru> DuyetDuTru { get; set; }
        public async Task<List<PhieuThanhLyDetails>> GetPhieuThanhLyDetailsAsync()
        {
            return await this.PhieuThanhLyDetails.FromSqlRaw("EXEC GetPhieuThanhLyDetails").ToListAsync();
        } 

        // Tạo một phương thức để gọi stored procedure và trả về danh sách kết quả
        public async Task<List<PhieuThanhLyDetails>> GetPhieuThanhLyDetailsAsyncChiTiet(int maPhieuTL)
        {
            var maPhieuTLParam = new SqlParameter("@MaPhieuTL", maPhieuTL);

            return await this.PhieuThanhLyDetails
                .FromSqlRaw("EXEC GetPhieuThanhLyDetailsChiTiet @MaPhieuTL", maPhieuTLParam)
                .ToListAsync();
        }
        // Thống kê hóa chất sử dụng theo môn học
        public async Task<List<ThongKeHoaChatSuDungTheoMonHocResult>> ThongKeHoaChatSuDungTheoMonHoc(DateTime startDate, DateTime endDate)
        {
            var results = new List<ThongKeHoaChatSuDungTheoMonHocResult>();

            using (var command = this.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "ThongKeHoaChatSuDungTheoMonHoc";
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@StartDate", startDate));
                command.Parameters.Add(new SqlParameter("@EndDate", endDate));

                this.Database.OpenConnection();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        results.Add(new ThongKeHoaChatSuDungTheoMonHocResult
                        {
                            MonHoc = reader["MonHoc"].ToString(),
                            HoaChat = reader["HoaChat"].ToString(),
                            TongSoLuongSuDung = Convert.ToInt32(reader["TongSoLuongSuDung"])
                        });
                    }
                }

                this.Database.CloseConnection();
            }

            return results;
        }

        // Thống kê hóa chất tồn kho
        public async Task<List<ThongKeHoaChatTonKhoResult>> ThongKeHoaChatTonKho()
        {
            var results = new List<ThongKeHoaChatTonKhoResult>();

            using (var command = this.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "ThongKeHoaChatTonKho";
                command.CommandType = CommandType.StoredProcedure;

                this.Database.OpenConnection();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        results.Add(new ThongKeHoaChatTonKhoResult
                        {
                            HoaChat = reader["HoaChat"].ToString(),
                            MaCAS = reader["MaCAS"].ToString(),
                            TongSoLuongTon = Convert.ToInt32(reader["TongSoLuongTon"]),
                            SoLoHoaChat = Convert.ToInt32(reader["SoLoHoaChat"])
                        });
                    }
                }

                this.Database.CloseConnection();
            }

            return results;
        }

        // Thống kê hóa chất sắp hết hạn
        public async Task<List<ThongKeHoaChatSapHetHanResult>> ThongKeHoaChatSapHetHan(int soNgayCanhBao)
        {
            var results = new List<ThongKeHoaChatSapHetHanResult>();

            using (var command = this.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "ThongKeHoaChatSapHetHan";
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@SoNgayCanhBao", soNgayCanhBao));

                this.Database.OpenConnection();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        results.Add(new ThongKeHoaChatSapHetHanResult
                        {
                            HoaChat = reader["HoaChat"].ToString(),
                            MaCAS = reader["MaCAS"].ToString(),
                            MaLo = reader["MaLo"].ToString(),
                            HanSuDung = Convert.ToDateTime(reader["HanSuDung"]),
                            SoNgayConLai = Convert.ToInt32(reader["SoNgayConLai"]),
                            SoLuongTon = Convert.ToInt32(reader["SoLuongTon"])
                        });
                    }
                }

                this.Database.CloseConnection();
            }

            return results;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MaxQuantityLotDto>().HasNoKey();
            // Cấu hình các mối quan hệ giữa các bảng
            modelBuilder.Entity<PhieuThanhLy>()
                .HasOne(p => p.NguoiDung)
                .WithMany()
                .HasForeignKey(p => p.MaNguoiDung);

            modelBuilder.Entity<LoHoaChat>()
                .HasOne(lh => lh.HoaChat)
                .WithMany(h => h.LoHoaChats)
                .HasForeignKey(lh => lh.MaHoaChat);

            modelBuilder.Entity<LoHoaChat>()
                .HasOne(lh => lh.PhieuThanhLy)
                .WithMany(p => p.LoHoaChats)
                .HasForeignKey(lh => lh.MaPhieuTL);

            modelBuilder.Entity<DuyetPhieuTL>()
                .HasOne(d => d.PhieuThanhLy)
                .WithMany(p => p.DuyetPhieuTLs)
                .HasForeignKey(d => d.MaPhieuTL);
            // Cấu hình PhieuThanhLyDetails không có khóa chính
            modelBuilder.Entity<PhieuThanhLyDetails>().HasNoKey();


            modelBuilder.Entity<LoHoaChat>()
           .HasOne(l => l.HoaChat)
           .WithMany(h => h.LoHoaChats)
           .HasForeignKey(l => l.MaHoaChat);

            modelBuilder.Entity<LoHoaChat>()
                .HasOne(l => l.PhieuThanhLy)
                .WithMany(p => p.LoHoaChats)
                .HasForeignKey(l => l.MaPhieuTL);
            // Định nghĩa khóa chính phức hợp cho ChiTietDeXuat
            modelBuilder.Entity<ChiTietDeXuat>()
                .HasKey(ct => new { ct.MaPhieuDX, ct.MaHoaChat });
           
            modelBuilder.Entity<DuyetPhieuDX>()
                .HasKey(dp => new { dp.MaPhieuDX, dp.MaNguoiDung });
            modelBuilder.Entity<DuyetDuTru>()
                .HasKey(dp => new { dp.MaBaiTN, dp.MaNguoiDung });
            // Định nghĩa khóa chính phức hợp cho bảng ChiTietPhanBo
            modelBuilder.Entity<ChiTietPhanBo>()
                .HasKey(ctpb => new { ctpb.MaPhieuPB, ctpb.MaLo });
            // Cấu hình quan hệ nhiều-nhiều giữa HoaChat và BaiThiNghiem qua bảng DuTru
            // Cấu hình quan hệ nhiều-nhiều giữa HoaChat và BaiThiNghiem qua bảng DuTru
            
            modelBuilder.Entity<MonHoc>()
           .HasKey(m => m.MaMon);

            modelBuilder.Entity<DuTru>()
            .HasKey(dt => new { dt.MaHoaChat, dt.MaBaiTN });

            base.OnModelCreating(modelBuilder);

        }
    }
}
