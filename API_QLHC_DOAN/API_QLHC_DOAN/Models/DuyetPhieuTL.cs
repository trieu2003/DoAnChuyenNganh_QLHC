using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_QLHC_DOAN.Models
{
    public class DuyetPhieuTL
    {
        [Key]
        public int MaDuyetPhieuTL { get; set; }

        [Required]
        public int MaPhieuTL { get; set; }

        [Required]
        public int MaNguoiDung { get; set; }

        [Required]
        public DateTime NgayDuyet { get; set; }

        public string? TrangThai { get; set; }

        public PhieuThanhLy PhieuThanhLy { get; set; }
        public NguoiDung NguoiDung { get; set; }
    }
}
