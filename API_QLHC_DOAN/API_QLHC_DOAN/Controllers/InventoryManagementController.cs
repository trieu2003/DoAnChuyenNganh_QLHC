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

        [HttpGet("GetAllPhieuNhap")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllPhieuNhap()
        {
            var phieuNhapList = await _context.PhieuNhap
                .Join(
                    _context.NguoiDung,                 // Bảng join
                    phieuNhap => phieuNhap.MaNguoiDung, // Khóa ngoại trong PhieuNhap
                    nguoiDung => nguoiDung.MaNguoiDung, // Khóa chính trong NguoiDung
                    (phieuNhap, nguoiDung) => new       // Kết quả join
                    {
                        phieuNhap.MaPhieuNhap,
                        phieuNhap.NgayNhap,
                        phieuNhap.SoLuongNhap,
                        phieuNhap.GhiChu,
                        TenNguoiDung = nguoiDung.TenNguoiDung
                    }
                )
                .ToListAsync();

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
        public IActionResult AddLots([FromBody] List<LoHoaChatDTO> lots)
        {
            if (lots == null || !lots.Any())
            {
                return BadRequest("No lots provided.");
            }

            try
            {
                foreach (var lotDTO in lots)
                {
                    // Kiểm tra khóa ngoại MaHoaChat
                    var hoaChatExists = _context.HoaChat.Any(hc => hc.MaHoaChat == lotDTO.MaHoaChat);
                    if (!hoaChatExists)
                    {
                        return BadRequest($"Chemical ID {lotDTO.MaHoaChat} does not exist.");
                    }

                    // Kiểm tra khóa ngoại MaPhieuTL (nếu có)
                    if (lotDTO.MaPhieuTL.HasValue)
                    {
                        var phieuThanhLyExists = _context.PhieuThanhLy.Any(ptl => ptl.MaPhieuTL == lotDTO.MaPhieuTL.Value);
                        if (!phieuThanhLyExists)
                        {
                            return BadRequest($"Phieu Thanh Ly ID {lotDTO.MaPhieuTL} does not exist.");
                        }
                    }

                    // Kiểm tra khóa ngoại MaPhieuNhap (nếu có)
                    if (lotDTO.MaPhieuNhap.HasValue)
                    {
                        var phieuNhapExists = _context.PhieuNhap.Any(pn => pn.MaPhieuNhap == lotDTO.MaPhieuNhap.Value);
                        if (!phieuNhapExists)
                        {
                            return BadRequest($"Phieu Nhap ID {lotDTO.MaPhieuNhap} does not exist.");
                        }
                    }

                    // Chuyển đổi DTO thành Entity (LoHoaChat)
                    var lot = new LoHoaChat
                    {
                        NhaCungCap = lotDTO.NhaCungCap,
                        SoLuong = lotDTO.SoLuong,
                        HanSuDung = lotDTO.HanSuDung,
                        TrangThai = lotDTO.TrangThai,
                        SoLuongTon = lotDTO.SoLuongTon,
                        GhiChu = lotDTO.GhiChu,
                        MaHoaChat = lotDTO.MaHoaChat,
                        MaPhieuTL = lotDTO.MaPhieuTL,
                        MaPhieuNhap = lotDTO.MaPhieuNhap
                    };

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
        [HttpGet("GetChemicals")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> GetChemicals()
        {
            var chemicals = await _context.HoaChat
                .Select(hc => new
                {
                    hc.MaHoaChat,
                    hc.TenHoaChat
                })
                .ToListAsync();

            if (chemicals == null || !chemicals.Any())
            {
                return NotFound("No chemicals found.");
            }

            return Ok(chemicals);
        }

    }
}
