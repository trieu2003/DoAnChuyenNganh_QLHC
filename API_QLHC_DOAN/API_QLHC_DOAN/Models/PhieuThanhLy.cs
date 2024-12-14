﻿//using API_QLHC_DOAN.Models;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations;
//namespace API_QLHC_DOAN.Models
//{
//    public class PhieuThanhLy
//    {
//        [Key]
//        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//        public int MaPhieuTL { get; set; }

//        [Required]
//        [MaxLength(255)]
//        public string LyDo { get; set; }

//        [Required]
//        [MaxLength(50)]
//        public string TrangThai { get; set; }

//        [MaxLength(50)]
//        public string PhuongThucThanhLy { get; set; }

//        [Required]
//        public DateTime NgayTao { get; set; }

//        [Required]
//        public int MaNguoiDung { get; set; }

//        // Navigation properties
//        public NguoiDung NguoiDung { get; set; } // Liên kết đến bảng Người Dùng
//        public ICollection<LoHoaChat> LoHoaChats { get; set; }
//        public ICollection<DuyetPhieuTL> DuyetPhieuTLs { get; set; }
//    }

//    public class PhieuThanhLyDto
//    {
//        public string LyDo { get; set; }
//        public string PhuongThucThanhLy { get; set; }
//        public DateTime NgayTao { get; set; }
//        public int MaNguoiDung { get; set; }
//    }

//    public class CreatePhieuThanhLyRequest
//    {
//        public PhieuThanhLyDto PhieuThanhLy { get; set; }
//        //public List<int> MaHoaChatList { get; set; } // Danh sách mã hóa chất để thanh lý
//        public List<string> SoLoList { get; set; } // Danh sách số lô cần thanh lý
//    }

//    public class HoaChatDto
//    {
//        public int MaHoaChat { get; set; }  // Mã hóa chất
//        public string SoLo { get; set; }    // Số lô hóa chất
//        public int SoLuong  { get; set; }    // Số lô hóa chất

//        public string SoCAS { get; set; }   // Số CAS
//        public string TenHoaChat { get; set; }  // Tên hóa chất
//        public string DonVi { get; set; }   // Đơn vị
//        public string? MoTa { get; set; }   // Mô tả (có thể null)
//        public string? CongThucHoaHoc { get; set; }  // Công thức hóa học (có thể null)
//        public string? NguyHiem { get; set; }   // Nguy hiểm (có thể null)
//        public string? SoLieuAnToan { get; set; }  // Số liệu an toàn (có thể null)
//        public DateTime? ThoiHanSuDung { get; set; }  // Thời hạn sử dụng (có thể null)
//        public string? HinhAnh { get; set; }   // Hình ảnh của hóa chất (có thể null)
//        public DateTime NgayTao { get; set; } // Ngày tạo
//    }

//    public class PhieuThanhLyDetails
//    {
//        public int MaPhieuTL { get; set; }
//        public string LyDo { get; set; }
//        public string TrangThai { get; set; }
//        public string PhuongThucThanhLy { get; set; }
//        public DateTime NgayTao { get; set; }
//        public int MaNguoiDung { get; set; }
//        public string ? NguoiDung_TenDangNhap { get; set; }
//        public string ? NguoiDung_Email { get; set; }
//        public int? MaLo { get; set; }
//        public string NhaCungCap { get; set; }
//        public int SoLuong { get; set; }
//        public DateTime HanSuDung { get; set; }
//        public string LoTrangThai { get; set; }
//        public string TenHoaChat { get; set; }
//        public string HoaChatSoLo { get; set; }
//        public string HoaChatSoCAS { get; set; }
//        //public int? DuyetPhieuTL_MaNguoiDung { get; set; }
//        //public DateTime? DuyetPhieuTL_NgayDuyet { get; set; }
//        //public string? DuyetPhieuTL_TrangThai { get; set; }
//        public List<HoaChatDetails> HoaChatDetails { get; internal set; }
//    }

//    public class HoaChatDetails
//    {
//        public string TenHoaChat { get; set; }
//        public string SoLo { get; set; }
//        public string SoCAS { get; set; }
//        public int SoLuong { get; set; }
//        public string TrangThai { get; set; }
//        public DateTime? ThoiHanSuDung { get; set; }
//        public string MoTa { get; set; }
//        public string CongThucHoaHoc { get; set; }
//        public string NguyHiem { get; set; }
//        public string SoLieuAnToan { get; set; }
//    }


//}


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_QLHC_DOAN.Models
{
    // Class representing a PhieuThanhLy (Liquidation Slip)
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
        public NguoiDung NguoiDung { get; set; } // Reference to the 'NguoiDung' table
        public ICollection<LoHoaChat> LoHoaChats { get; set; } // Reference to the 'LoHoaChat' table
        public ICollection<DuyetPhieuTL> DuyetPhieuTLs { get; set; }
    }

    // DTO class for the creation of PhieuThanhLy
    public class PhieuThanhLyDto
    {
        public string LyDo { get; set; }
        public string PhuongThucThanhLy { get; set; }
        public DateTime NgayTao { get; set; }
        public int MaNguoiDung { get; set; }
    }

    // Class representing the details of a PhieuThanhLy, including the list of chemicals (HoaChat)
    public class PhieuThanhLyDetails
    {
        public int MaPhieuTL { get; set; }
        public string LyDo { get; set; }
        public string TrangThai { get; set; }
        public string PhuongThucThanhLy { get; set; }
        public DateTime? NgayTao { get; set; }
        public int MaNguoiDung { get; set; }
        public string? NguoiDung_TenDangNhap { get; set; }
        public string? NguoiDung_Email { get; set; }
        public int? MaLo { get; set; }
        public string NhaCungCap { get; set; }
        public int SoLuong { get; set; }
       
        public string ?GhiChu { get; set; }
        public DateTime HanSuDung { get; set; }
        public string LoTrangThai { get; set; }
        public string TenHoaChat { get; set; }

        public int ?SoLuongTon { get; set; }
        public string? DonVi { get; set; }
        public string? CongThucHoaHoc { get; set; }
        public string? HinhAnh { get; set; }
        public string ?MoTa { get; set; }
        public string ?NguyHiem { get; set; }
        public string ?SoLieuAnToan { get; set; }
     
        public DateTime ?NgayDuyet { get; set; }
   

        public string? HoaChatSoLo { get; set; }
        public string? HoaChatSoCAS { get; set; }
        public int? DuyetPhieuTL_MaNguoiDung { get; set; }
        public DateTime? DuyetPhieuTL_NgayDuyet { get; set; }
        public string? DuyetPhieuTL_TrangThai { get; set; }
        public List<HoaChatDetails> HoaChatDetails { get; internal set; }

    }

    //public class PhieuThanhLyDetails1
    //{
    //    // Thông tin về Phiếu Thanh Lý
    //    public int MaPhieuTL { get; set; }
    //    public string LyDo { get; set; }
    //    public string TrangThai { get; set; }
    //    public string PhuongThucThanhLy { get; set; }
    //    public DateTime NgayTaoPhieuTL { get; set; }
    //    public int MaNguoiDung { get; set; }
    //    public string TenNguoiDung { get; set; }

    //    // Thông tin về các hóa chất trong phiếu thanh lý
    //    public int MaHoaChat { get; set; }
    //    public string TenHoaChat { get; set; }
    //    public string SoCAS { get; set; }
    //    public string DonVi { get; set; }
    //    public string MoTa { get; set; }
    //    public string CongThucHoaHoc { get; set; }
    //    public string NguyHiem { get; set; }
    //    public string SoLieuAnToan { get; set; }
    //    public DateTime? ThoiHanSuDung { get; set; }
    //    public string HinhAnh { get; set; }
    //    public DateTime ?NgayTaoHoaChat { get; set; }
    //}


    // Class representing the details of a chemical (HoaChat)
    public class HoaChatDetails
    {
        public string TenHoaChat { get; set; } // Name of the chemical
        public string SoLo { get; set; }       // Batch number
        public string SoCAS { get; set; }      // CAS number
        public int SoLuong { get; set; }       // Quantity

        public string TrangThai { get; set; }  // Chemical status (e.g., available, expired)
        public DateTime? ThoiHanSuDung { get; set; } // Expiry date (nullable)
        public string MoTa { get; set; }       // Description of the chemical
        public string CongThucHoaHoc { get; set; } // Chemical formula
        public string NguyHiem { get; set; }   // Hazards of the chemical
        public string SoLieuAnToan { get; set; } // Safety data
    }

    // Class for the request to create a PhieuThanhLy, with associated batch numbers
    public class CreatePhieuThanhLyRequest
    {
        public PhieuThanhLyDto PhieuThanhLy { get; set; }
        public List<string> SoLoList { get; set; } // List of batch numbers to be liquidated
    }

    // Class representing HoaChatDto used in API response
    public class HoaChatDto
    {
        public int MaHoaChat { get; set; } // Chemical ID
        public string SoLo { get; set; }    // Batch number
        public int SoLuong { get; set; }    // Quantity of chemicals
        public string SoCAS { get; set; }   // CAS number
        public string TenHoaChat { get; set; } // Chemical name
        public string DonVi { get; set; }   // Unit of measure
        public string MoTa { get; set; }    // Description
        public string CongThucHoaHoc { get; set; } // Chemical formula
        public string NguyHiem { get; set; }   // Hazards
        public string SoLieuAnToan { get; set; }  // Safety data
        public DateTime? ThoiHanSuDung { get; set; }  // Expiry date (nullable)
        public string HinhAnh { get; set; }   // Image of the chemical (nullable)
        public DateTime NgayTao { get; set; } // Creation date
    }

    // Class representing NguoiDung (User)
    //public class NguoiDung
    //{
    //    [Key]
    //    public int MaNguoiDung { get; set; }
    //    public string TenDangNhap { get; set; }
    //    public string MatKhauHash { get; set; }
    //    public string Email { get; set; }
    //    public string VaiTro { get; set; } // Role (Admin, User, etc.)
    //    public DateTime NgayTao { get; set; }
    //    public string HinhAnh { get; set; } // Image
    //}
}
