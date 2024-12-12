using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class MonHoc
    {
        [Key]
        public int MaMon { get; set; } // Primary Key
        public string TenMon { get; set; }
        public int SoTC { get; set; }

        //// Navigation Properties
        //public ICollection<BaiThiNghiem>? BaiThiNghiems { get; set; }
        //public ICollection<LopHocPhan>? LopHocPhans { get; set; }
    }
}
