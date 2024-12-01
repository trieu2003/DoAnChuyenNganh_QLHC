using API_QLHC_DOAN.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace API_QLHC_DOAN.Models
{
    public class PhieuThanhLy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaPhieuTL { get; set; }

        [Required]
        [MaxLength(255)]
        public string LyDo { get; set; }

        [Required]
        [MaxLength(50)]
        public string TrangThai { get; set; }

        [MaxLength(50)]
        public string PhuongThucThanhLy { get; set; }

        [Required]
        public DateTime NgayTao { get; set; }

        [Required]
        public int MaNguoiDung { get; set; }

        // Navigation properties
        public NguoiDung NguoiDung { get; set; } // Liên kết đến bảng Người Dùng
        public ICollection<LoHoaChat> LoHoaChats { get; set; }
        public ICollection<DuyetPhieuTL> DuyetPhieuTLs { get; set; }
    }

    public class PhieuThanhLyDto
    {
        public string LyDo { get; set; }
        public string PhuongThucThanhLy { get; set; }
        public DateTime NgayTao { get; set; }
        public int MaNguoiDung { get; set; }
    }

    public class CreatePhieuThanhLyRequest
    {
        public PhieuThanhLyDto PhieuThanhLy { get; set; }
        //public List<int> MaHoaChatList { get; set; } // Danh sách mã hóa chất để thanh lý
        public List<string> SoLoList { get; set; } // Danh sách số lô cần thanh lý
    }

    public class HoaChatDto
    {
        public int MaHoaChat { get; set; }  // Mã hóa chất
        public string SoLo { get; set; }    // Số lô hóa chất
        public int SoLuong  { get; set; }    // Số lô hóa chất

        public string SoCAS { get; set; }   // Số CAS
        public string TenHoaChat { get; set; }  // Tên hóa chất
        public string DonVi { get; set; }   // Đơn vị
        public string? MoTa { get; set; }   // Mô tả (có thể null)
        public string? CongThucHoaHoc { get; set; }  // Công thức hóa học (có thể null)
        public string? NguyHiem { get; set; }   // Nguy hiểm (có thể null)
        public string? SoLieuAnToan { get; set; }  // Số liệu an toàn (có thể null)
        public DateTime? ThoiHanSuDung { get; set; }  // Thời hạn sử dụng (có thể null)
        public string? HinhAnh { get; set; }   // Hình ảnh của hóa chất (có thể null)
        public DateTime NgayTao { get; set; } // Ngày tạo
    }

}

public class PhieuThanhLyDetails
{
    public int MaPhieuTL { get; set; }
    public string LyDo { get; set; }
    public string TrangThai { get; set; }
    public string PhuongThucThanhLy { get; set; }
    public DateTime NgayTao { get; set; }
    public int MaNguoiDung { get; set; }
    public string NguoiDung_TenDangNhap { get; set; }
    public string NguoiDung_Email { get; set; }
    public int? MaLo { get; set; }
    public string? NhaCungCap { get; set; }
    public int? SoLuong { get; set; }
    public DateTime? HanSuDung { get; set; }
    public string? LoTrangThai { get; set; }
    public string? TenHoaChat { get; set; }
    public string? HoaChatSoLo { get; set; }
    public string ?HoaChatSoCAS { get; set; }
    public int? DuyetPhieuTL_MaNguoiDung { get; set; }
    public DateTime? DuyetPhieuTL_NgayDuyet { get; set; }
    public string? DuyetPhieuTL_TrangThai { get; set; }
}