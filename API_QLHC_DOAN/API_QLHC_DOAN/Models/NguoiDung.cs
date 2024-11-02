using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class NguoiDung
    {
        [Key]
        public int MaNguoiDung { get; set; }

        [Required]
        [MaxLength(50)]
        public string TenDangNhap { get; set; }

        [Required]
        public string MatKhauHash { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string VaiTro { get; set; }

        [Required]
        public DateTime NgayTao { get; set; }
    }
}
