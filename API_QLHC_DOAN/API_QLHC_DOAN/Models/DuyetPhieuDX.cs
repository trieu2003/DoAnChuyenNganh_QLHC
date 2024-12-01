using API_QLHC_DOAN.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class DuyetPhieuDX
{
    [Key, Column(Order = 0)]
    public int MaPhieuDX { get; set; }

    [Key, Column(Order = 1)]
    public int MaNguoiDung { get; set; }

    [Required]
    public DateTime NgayDuyet { get; set; }

    [Required]
    [MaxLength(50)]
    public string TrangThai { get; set; }

    public string LyDoTuChoi { get; set; }

}
