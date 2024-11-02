using System;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class HoaChat
    {
        [Key]  // This attribute marks the property as the primary key
        public int MaHoaChat { get; set; }

        public string SoCAS { get; set; }
        public string TenHoaChat { get; set; }
        public string DonVi { get; set; }
        public string? MoTa { get; set; }
        public string? CongThucHoaHoc { get; set; }
        public string? NguyHiem { get; set; }
        public string? SoLieuAnToan { get; set; }
        public DateTime? ThoiHanSuDung { get; set; }
        public string? HinhAnh { get; set; }
        public DateTime NgayTao { get; set; }
    }
}
