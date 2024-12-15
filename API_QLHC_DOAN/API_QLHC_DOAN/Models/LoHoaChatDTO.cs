using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class LoHoaChatDTO
    {
        [Key]
        public int MaLo { get; set; }

        [MaxLength(255)]
        public string NhaCungCap { get; set; }

        [Required]
        public int SoLuong { get; set; }

        [Required]
        public string SoLo { get; set; }

        [Required]
        public DateTime HanSuDung { get; set; }

        [Required]
        [MaxLength(50)]
        public string TrangThai { get; set; }

        [Required]
        public int SoLuongTon { get; set; }

        [MaxLength(255)]
        public string GhiChu { get; set; }

        [Required]
        [ForeignKey("HoaChat")]
        public int MaHoaChat { get; set; }

        [ForeignKey("PhieuThanhLy")]
        public int? MaPhieuTL { get; set; }

        [ForeignKey("PhieuNhap")]
        public int? MaPhieuNhap { get; set; }
    }
}
