using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_QLHC_DOAN.Models
{
    
    public class LoHoaChat
    {
        [Key]
        public int MaLo { get; set; }
        public string SoLo { get; set; }

        [MaxLength(255)]
        public string NhaCungCap { get; set; }

        //[Required]
        //[MaxLength(50)]
        //public string SoLo { get; set; }  // Số lô hóa chất

        [Required]
        public int SoLuong { get; set; }

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



        // Navigation properties
        public HoaChat HoaChat { get; set; } // Mối quan hệ với HoaChat
        public PhieuThanhLy PhieuThanhLy { get; set; } // Mối quan hệ với PhieuThanhLy
       
    }

    public class LoHoaChatDTO
    {
        [Key]
        public int MaLo { get; set; }
        public string SoLo { get; set; }

        [MaxLength(255)]
        public string NhaCungCap { get; set; }

        [Required]
        public int SoLuong { get; set; }

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
