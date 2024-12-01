using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class PhieuDeXuat
    {
        [Key]
        public int MaPhieuDX { get; set; }

        [StringLength(255)]
        public string LyDo { get; set; }

        [Required]
        [StringLength(50)]
        public string TrangThai { get; set; }

        [Required]
        public DateTime NgayTao { get; set; }
        public int MaNguoiDung { get; set; }

    }
}
