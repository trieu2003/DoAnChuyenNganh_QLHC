using API_QLHC_DOAN.Models;
using Microsoft.EntityFrameworkCore;
using System;
namespace API_QLHC_DOAN.Data
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        public DbSet<NguoiDung> NguoiDung { get; set; }   // Chú ý đặt đúng tên bảng
    }
}
