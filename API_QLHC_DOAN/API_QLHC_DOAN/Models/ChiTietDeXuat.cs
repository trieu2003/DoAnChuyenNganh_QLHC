using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class ChiTietDeXuat
    {
        [ForeignKey("PhieuDeXuat")]
        public int MaPhieuDX { get; set; }

        [ForeignKey("HoaChat")]
        public int MaHoaChat { get; set; }

        [Required]
        public int SoLuong { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal DonGia { get; set; }

        public virtual PhieuDeXuat PhieuDeXuat { get; set; }
        public virtual HoaChat HoaChat { get; set; }
    }
}
