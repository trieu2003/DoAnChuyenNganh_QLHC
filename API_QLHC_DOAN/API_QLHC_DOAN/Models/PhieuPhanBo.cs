using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class PhieuPhanBo
    {
        [Key]
        public int MaPhieuPB { get; set; }

        [Required]
        public DateTime NgayLap { get; set; }

        [StringLength(255)]
        public string NoiDung { get; set; }

        [Required]
        public int MaLHP { get; set; }

    }
}
