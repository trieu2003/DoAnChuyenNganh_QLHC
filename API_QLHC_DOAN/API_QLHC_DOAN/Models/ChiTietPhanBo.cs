using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class ChiTietPhanBo
    {
        [Key, Column(Order = 0)]
        public int MaPhieuPB { get; set; } // Khóa chính và khóa ngoại

        [Key, Column(Order = 1)]
        public int MaLo { get; set; } // Khóa chính và khóa ngoại

        [Required]
        public int SoLuong { get; set; } // Số lượng phân bổ

    }
}
