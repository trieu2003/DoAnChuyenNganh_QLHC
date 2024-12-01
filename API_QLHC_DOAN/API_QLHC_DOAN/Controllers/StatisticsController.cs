using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_QLHC_DOAN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_QLHC_DOAN.Data;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly YourDbContext _context;

        public StatisticsController(YourDbContext context)
        {
            _context = context;
        }

        [HttpGet("phieu-thanh-ly-statistics")]
        public async Task<ActionResult<IEnumerable<PhieuThanhLyStatusStatistic>>> GetPhieuThanhLyStatistics()
        {
            try
            {
                // Lấy tất cả phiếu thanh lý với thông tin chi tiết
                var phieuThanhLys = await _context.PhieuThanhLy.ToListAsync();

                // Lấy tất cả lô hóa chất liên quan đến phiếu thanh lý
                var loHoaChats = await _context.LoHoaChat.ToListAsync();

                // Tính thống kê
                var result = phieuThanhLys
                    .GroupBy(p => p.TrangThai)
                    .Select(g => new PhieuThanhLyStatusStatistic
                    {
                        TrangThai = g.Key,
                        TotalCount = g.Count(),  // Tổng số phiếu thanh lý theo trạng thái
                        TotalQuantity = g.Sum(p =>
                            loHoaChats.Where(lh => lh.MaPhieuTL == p.MaPhieuTL)
                                      .Sum(lh => lh.SoLuong))  // Tổng số lượng từ các LoHoaChat liên quan
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        //// API Thống kê số lượng Hóa Chất theo từng loại
        //[HttpGet("hoa-chat-statistics")]
        //public async Task<ActionResult<IEnumerable<HoaChatStatistic>>> GetHoaChatStatistics()
        //{
        //    try
        //    {
        //        var result = await _context.HoaChat
        //            .GroupBy(h => h.MaHoaChat)
        //            .Select(g => new HoaChatStatistic
        //            {
        //                MaHoaChat = g.Key,
        //                TenHoaChat = g.FirstOrDefault().TenHoaChat,
        //                TotalQuantity = g.Sum(x => x.SoLuong) // Tổng số lượng
        //            })
        //            .ToListAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error: " + ex.Message);
        //    }
        //}

        // API Thống kê số lượng Lô Hóa Chất theo trạng thái
        [HttpGet("lo-hoa-chat-statistics")]
        public async Task<ActionResult<IEnumerable<LoHoaChatStatistic>>> GetLoHoaChatStatistics()
        {
            try
            {
                var result = await _context.LoHoaChat
                    .GroupBy(l => l.TrangThai)
                    .Select(g => new LoHoaChatStatistic
                    {
                        TrangThai = g.Key,
                        TotalCount = g.Count(),
                        TotalQuantity = g.Sum(x => x.SoLuong) // Tổng số lượng của tất cả các lô
                    })
                    .ToListAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        //// API Thống kê số lượng Phiếu Thanh Lý theo Người Duyệt
        //[HttpGet("phieu-thanh-ly-by-duyet")]
        //public async Task<ActionResult<IEnumerable<PhieuThanhLyByDuyetStatistic>>> GetPhieuThanhLyByDuyet()
        //{
        //    try
        //    {
        //        var result = await _context.DuyetPhieuTL
        //            .GroupBy(d => d.MaNguoiDung)
        //            .Select(g => new PhieuThanhLyByDuyetStatistic
        //            {
        //                MaNguoiDung = g.Key,
        //                TenNguoiDung = _context.NguoiDung.Where(n => n.MaNguoiDung == g.Key).Select(n => n.TenDangNhap).FirstOrDefault(),
        //                TotalCount = g.Count(),
        //                TotalQuantity = g.Sum(x => x.SoLuongDeXuat) // Tổng số lượng của phiếu thanh lý duyệt
        //            })
        //            .ToListAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error: " + ex.Message);
        //    }
        //}



        // API Thống kê tổng hợp về số lượng các phiếu thanh lý đã duyệt
        [HttpGet("total-phieu-thanh-ly")]
        public async Task<ActionResult<int>> GetTotalPhieuThanhLy()
        {
            try
            {
                var totalCount = await _context.PhieuThanhLy.CountAsync();
                return Ok(totalCount);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpGet("hoa-chat-statistics")]
        public async Task<ActionResult<IEnumerable<HoaChatStatistic>>> GetHoaChatStatistics()
        {
            try
            {
                // Lấy tất cả các lô hóa chất liên quan đến mỗi hóa chất
                var result = await _context.LoHoaChat
                    .GroupBy(lh => lh.MaHoaChat)  // Nhóm theo MaHoaChat
                    .Select(g => new HoaChatStatistic
                    {
                        MaHoaChat = g.Key,
                        TenHoaChat = g.FirstOrDefault().HoaChat.TenHoaChat, // Lấy tên hóa chất từ bảng HoaChat
                        TotalQuantity = g.Sum(lh => lh.SoLuong)  // Tính tổng số lượng của tất cả các lô
                    })
                    .ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


    }
}
public class PhieuThanhLyStatusStatistic
{
    public string TrangThai { get; set; }  // Trạng thái thanh lý
    public int TotalCount { get; set; }    // Tổng số lượng phiếu thanh lý theo trạng thái
    public int TotalQuantity { get; set; } // Tổng số lượng (dựa trên SoLuong trong bảng của bạn)
}

public class HoaChatStatistic
{
    public int MaHoaChat { get; set; }
    public string TenHoaChat { get; set; }
    public int TotalQuantity { get; set; }
}
public class LoHoaChatStatistic
{
    public string TrangThai { get; set; }
    public int TotalCount { get; set; }
    public int TotalQuantity { get; set; }
}
public class PhieuThanhLyByDuyetStatistic
{
    public int MaNguoiDung { get; set; }
    public string TenNguoiDung { get; set; }
    public int TotalCount { get; set; }
    public int TotalQuantity { get; set; }
}
