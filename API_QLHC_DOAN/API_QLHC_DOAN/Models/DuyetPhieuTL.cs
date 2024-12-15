//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace API_QLHC_DOAN.Models
//{
//    public class DuyetPhieuTL
//    {
//        [Key]
//        public int MaDuyetPhieuTL { get; set; }

//        [Required]
//        public int MaPhieuTL { get; set; }

//        [Required]
//        public int MaNguoiDung { get; set; }

//        [Required]
//        public DateTime NgayDuyet { get; set; }

//        public string? TrangThai { get; set; }

//        public PhieuThanhLy PhieuThanhLy { get; set; }
//        public NguoiDung NguoiDung { get; set; }
//    }
//}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_QLHC_DOAN.Models
{
    [Table("DuyetPhieuTL")]
    public class DuyetPhieuTL
    {
        [Key]
        [Column("MaLichSu")]
        public int MaLichSu { get; set; } // Primary key (MaLichSu)

        [Required]
        [Column("MaPhieuTL")]
        public int MaPhieuTL { get; set; } // Foreign key to PhieuThanhLy

        [Required]
        [Column("MaNguoiDung")]
        public int MaNguoiDung { get; set; } // Foreign key to NguoiDung

        [Required]
        [Column("NgayDuyet")]
        public DateTime NgayDuyet { get; set; } // Approval date

        [Column("TrangThai")]
        [MaxLength(50)]
        public string? TrangThai { get; set; } // Status: "Đã duyệt", "Đã từ chối"

        [Column("LyDoTuChoi")]
        [MaxLength(255)]
        public string? LyDoTuChoi { get; set; } // Reason for rejection (optional)

        // Navigation properties
        [ForeignKey("MaPhieuTL")]
        public PhieuThanhLy PhieuThanhLy { get; set; }

        [ForeignKey("MaNguoiDung")]
        public NguoiDung NguoiDung { get; set; }
    }
    public class DuyetPhieuTLDto
    {
        public int MaLichSu { get; set; }
        public int MaPhieuTL { get; set; }
        public int MaNguoiDung { get; set; }
        public DateTime NgayDuyet { get; set; }
        public string? TrangThai { get; set; }
        public string? LyDoTuChoi { get; set; }
    }

}
