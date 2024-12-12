using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class BaiThiNghiem
    {
        [Key]
        public int MaBaiTN { get; set; } // Primary Key
        public string TenBaiTN { get; set; } = string.Empty;
        public int MaMon { get; set; } // Foreign Key

        // Navigation Property
        //public MonHoc? MonHoc { get; set; }
        //public ICollection<DuTru>? DuTrus { get; set; }
        public class CreateBaiThiNghiemDto
        {
            public string TenBaiTN { get; set; } = string.Empty;
            public int MaMon { get; set; }
        }

    }
}
