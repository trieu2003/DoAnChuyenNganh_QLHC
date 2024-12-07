using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API_QLHC_DOAN.Models
{
    public class DuTru
    {
        public int MaHoaChat { get; set; }
        public int MaBaiTN { get; set; }
        public int SoLuong { get; set; }

        public HoaChat HoaChat { get; set; }
        public BaiThiNghiem BaiThiNghiem { get; set; }
    }




    // Model BaiThiNghiem (lưu thông tin bài thí nghiệm)
    public class BaiThiNghiem
    {
        public int MaBaiTN { get; set; }
        public string TenBaiTN { get; set; }
        public int MaMon { get; set; }

        public MonHoc MonHoc { get; set; }
    }


    public class CreateDuTruRequest
    {
        public List<DuTruHoaChatDto> DuTruHoaChatList { get; set; }
    }

    public class DuTruHoaChatDto
    {
        public int MaHoaChat { get; set; }  // Mã hóa chất
        public int MaBaiTN { get; set; }    // Mã bài thí nghiệm
        public int SoLuong { get; set; }    // Số lượng hóa chất cần dự trù
    }
    public class MonHoc
    {
        [Key]  // Đảm bảo rằng MaMon là khóa chính
        public int MaMon { get; set; }      // Khóa chính
        public string TenMon { get; set; }  // Tên môn học
        public int SoTC { get; set; }       // Số tín chỉ

        // Mối quan hệ với bảng BaiThiNghiem
        public ICollection<BaiThiNghiem> BaiThiNghiems { get; set; }
    }

}
