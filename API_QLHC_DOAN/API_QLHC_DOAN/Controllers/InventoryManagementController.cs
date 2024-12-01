using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryManagementController : ControllerBase
    {
        private readonly YourDbContext _context;

        public InventoryManagementController(YourDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách tất cả phiếu nhập
        [HttpGet("GetAllPhieuNhap")]
        public async Task<ActionResult<IEnumerable<PhieuNhap>>> GetAllPhieuNhap()
        {
            var phieuNhapList = await _context.PhieuNhap.ToListAsync();
            return Ok(phieuNhapList);
        }

        [HttpPost("AddPhieuNhap")]
        public async Task<ActionResult<PhieuNhap>> AddPhieuNhap([FromBody] PhieuNhap newPhieuNhap)
        {
            // Validate the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure the object is not null
            if (newPhieuNhap == null)
            {
                return BadRequest("PhieuNhap cannot be null.");
            }

            // Create a new instance to ensure only specified properties are set
            var phieuNhapToAdd = new PhieuNhap
            {
                SoLuongNhap = newPhieuNhap.SoLuongNhap > 0 ? newPhieuNhap.SoLuongNhap : 1, // Ensure a positive value
                NgayNhap = newPhieuNhap.NgayNhap,
                GhiChu = newPhieuNhap.GhiChu,
                MaNguoiDung = newPhieuNhap.MaNguoiDung
            };

            try
            {
                // Add new entry to DbContext
                _context.PhieuNhap.Add(phieuNhapToAdd);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the created entry with status code 201
                return CreatedAtAction(nameof(GetPhieuNhapById), new { id = phieuNhapToAdd.MaPhieuNhap }, phieuNhapToAdd);
            }
            catch (Exception ex)
            {
                // Log error (consider using a logging framework)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddLots")]
        public IActionResult AddLots([FromBody] List<LoHoaChat> lots)
        {
            if (lots == null || !lots.Any())
            {
                return BadRequest("No lots provided.");
            }

            try
            {
                // Kiểm tra các giá trị khóa ngoại và ràng buộc dữ liệu
                foreach (var lot in lots)
                {
                    // Kiểm tra khóa ngoại MaHoaChat
                    var hoaChatExists = _context.HoaChat.Any(hc => hc.MaHoaChat == lot.MaHoaChat);
                    if (!hoaChatExists)
                    {
                        return BadRequest($"Chemical ID {lot.MaHoaChat} does not exist.");
                    }

                
                    // Thêm lô hóa chất vào context
                    _context.LoHoaChat.Add(lot);
                }

                // Lưu thay đổi vào cơ sở dữ liệu
                _context.SaveChanges();
                return Ok("Lots added successfully.");
            }
            catch (DbUpdateException dbEx)
            {
                // Xử lý chi tiết hơn lỗi khi cập nhật cơ sở dữ liệu
                return StatusCode(500, "Database update error: " + dbEx.InnerException?.Message ?? dbEx.Message);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi khác
                return StatusCode(500, "Error saving lots: " + ex.Message);
            }
        }

        [HttpGet("api/lohoaChat/{maPhieuNhap}")]
        public async Task<IActionResult> GetChemicalLotsByPhieuNhap(int maPhieuNhap)
        {
            var chemicalLots = await _context.LoHoaChat
                .Where(lot => lot.MaPhieuNhap == maPhieuNhap)
                .ToListAsync();

            if (chemicalLots == null || !chemicalLots.Any())
            {
                return NotFound("No chemical lots found for this Phieu Nhap.");
            }

            return Ok(chemicalLots);
        }




        // Lấy chi tiết phiếu nhập theo ID
        [HttpGet("GetPhieuNhapById/{id}")]
        public async Task<ActionResult<PhieuNhap>> GetPhieuNhapById(int id)
        {
            var phieuNhap = await _context.PhieuNhap.FindAsync(id);

            if (phieuNhap == null)
            {
                return NotFound();
            }

            return Ok(phieuNhap);
        }
    }
}
