using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuyetPhieuTLController : ControllerBase
    {
        private readonly YourDbContext _context;

        // Constructor nhận vào DbContext
        public DuyetPhieuTLController(YourDbContext context)
        {
            _context = context;
        }

        [HttpGet("duyet-phieu-thanh-ly")]
        public async Task<ActionResult<IEnumerable<DuyetPhieuTLDto>>> GetDuyetPhieuThanhLy()
        {
            try
            {
                // Lấy tất cả dữ liệu từ bảng DuyetPhieuTL
                var duyetPhieuList = await _context.DuyetPhieuTL
                    .Select(dp => new DuyetPhieuTLDto
                    {
                        MaLichSu = dp.MaLichSu,
                        MaPhieuTL = dp.MaPhieuTL,
                        MaNguoiDung = dp.MaNguoiDung,
                        NgayDuyet = dp.NgayDuyet,
                        TrangThai = dp.TrangThai,
                        LyDoTuChoi = dp.LyDoTuChoi
                    })
                    .ToListAsync();

                if (duyetPhieuList == null || !duyetPhieuList.Any())
                {
                    return NotFound("Không có dữ liệu duyệt phiếu thanh lý.");
                }

                return Ok(duyetPhieuList); // Trả về dữ liệu dưới dạng DTO
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
            }
        }

    }
}
