using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Models
{
    public class LopHocPhan
    {
        [Key]
        public int MaLHP { get; set; } // Khóa chính

        [Required]
        public int SiSo { get; set; } // Sĩ số lớp học

        [StringLength(100)]
        public string GVDay { get; set; } // Giáo viên dạy

        [Required]
        public int MaMon { get; set; } // Khóa ngoại liên kết với bảng MonHoc

        //public MonHoc? MonHoc { get; set; }
    }
}
