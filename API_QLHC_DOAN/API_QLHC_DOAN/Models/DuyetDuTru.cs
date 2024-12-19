using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class DuyetDuTru
    {
        //[Key]
        //public int MaLichSu { get; set; } // Primary Key
        public int MaBaiTN { get; set; }

        
        public int MaNguoiDung { get; set; }

        [Required]
        public DateTime NgayDuyet { get; set; }

        [Required]
        [MaxLength(50)]
        public string TrangThai { get; set; }

        public string? LyDoTuChoi { get; set; }
    }
}
