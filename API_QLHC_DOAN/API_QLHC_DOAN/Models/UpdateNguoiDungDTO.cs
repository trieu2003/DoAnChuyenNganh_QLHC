using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class UpdateNguoiDungDTO
    {
        public string TenDangNhap { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        //public DateTime NgayTao { get; set; } = DateTime.Now;
    }
}
