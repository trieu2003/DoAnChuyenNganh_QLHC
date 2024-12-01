using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class PhieuNhap
    {

        [Key]
        public int MaPhieuNhap { get; set; }

        [Required]
        public int SoLuongNhap { get; set; }

        [Required]
        public DateTime NgayNhap { get; set; }

        [MaxLength(255)]
        public string GhiChu { get; set; }

        [Required]
        public int MaNguoiDung { get; set; }

        //// Navigation property (optional)
        //public NguoiDung NguoiDung { get; set; }
    }
}
