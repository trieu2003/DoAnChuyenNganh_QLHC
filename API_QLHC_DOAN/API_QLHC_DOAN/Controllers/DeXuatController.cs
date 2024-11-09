using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeXuatController : ControllerBase
    {
        private readonly YourDbContext _context;
        public DeXuatController(YourDbContext context)
        {
            _context = context;
        }
        // API tạo Phiếu Đề Xuất
        [HttpPost("create")]
        public async Task<IActionResult> CreateDeXuat([FromBody] PhieuDeXuat phieuDeXuat)
        {
            if (phieuDeXuat == null)
            {
                return BadRequest("Thông tin phiếu đề xuất không hợp lệ.");
            }

            // Lưu PhieuDeXuat
            _context.PhieuDeXuat.Add(phieuDeXuat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateDeXuat), new { id = phieuDeXuat.MaPhieuDX }, phieuDeXuat);
        }

        // API tạo Chi Tiết Đề Xuất
        [HttpPost("create-details")]
        public async Task<IActionResult> CreateChiTietDeXuat([FromBody] List<ChiTietDeXuat> chiTietDeXuat)
        {
            if (chiTietDeXuat == null || chiTietDeXuat.Count == 0)
            {
                return BadRequest("Thông tin chi tiết đề xuất không hợp lệ.");
            }

            // Lưu ChiTietDeXuat
            _context.ChiTietDeXuat.AddRange(chiTietDeXuat);
            await _context.SaveChangesAsync();

            return Ok(chiTietDeXuat);
        }
    }
}
