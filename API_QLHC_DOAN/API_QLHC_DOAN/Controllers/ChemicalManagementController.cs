﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChemicalManagementController : ControllerBase
    {
        private readonly YourDbContext _context;

        public ChemicalManagementController(YourDbContext context)
        {
            _context = context;
        }

        //GET: api/ChemicalManagement
        [HttpGet("GetTatCaHoaChat")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> GetAllChemicals()
        {
            var chemicals = await _context.HoaChat.ToListAsync();
            return Ok(chemicals);
        }
        [HttpGet("GetHoaChat")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> GetChemicals(int page = 1, int limit = 15)
        {
            // Kiểm tra các tham số đầu vào
            if (page < 1) page = 1;
            if (limit < 1) limit = 1; // Bạn có thể đặt giới hạn tối đa nếu cần

            // Lấy danh sách hóa chất với phân trang
            var chemicals = await _context.HoaChat
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            // Tính tổng số hóa chất
            var totalChemicals = await _context.HoaChat.CountAsync();

            // Tạo phản hồi với thông tin phân trang
            var response = new
            {
                Data = chemicals,
                TotalItems = totalChemicals,
                Page = page,
                Limit = limit,
                TotalPages = (int)Math.Ceiling((double)totalChemicals / limit) // Tính tổng số trang
            };

            // Kiểm tra nếu không có hóa chất nào được tìm thấy
            if (!chemicals.Any())
            {
                return NotFound(new { Message = "No chemicals found." });
            }

            return Ok(response);
        }
        [HttpGet("Search")]
        public async Task<IActionResult> Search(string searchTerm)
        {
            var chemicals = await _context.HoaChat
                .Where(c => c.SoCAS.Contains(searchTerm) || c.TenHoaChat.Contains(searchTerm)) // Tìm kiếm theo CAS hoặc tên
                .ToListAsync();

            if (chemicals.Count == 0)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy
            }

            return Ok(chemicals); // Trả về danh sách hóa chất tìm thấy
        }
        //[]
        //public async Task<ActionResult<IEnumerable<LoHoaChat>>> GetHoaChat()
        //{
        //    var lohoachat = await _context.LoHoaChat.ToListAsync();
        //    return Ok(lohoachat);
        //}
        // GET: api/ChemicalManagement/{id}/Lots
        // GET: api/ChemicalManagement/{id}/Lots
        [HttpGet("{id}/Lots")]
        public async Task<ActionResult<IEnumerable<LoHoaChat>>> GetChemicalLots(int id)
        {
            var lots = await _context.LoHoaChat
                .Where(l => l.MaHoaChat == id) // Lọc theo MaHoaChat
                .ToListAsync();

            if (lots.Count == 0)
            {
                return NotFound("No lots found for the specified chemical.");
            }

            return Ok(lots);
        }

        // GET: api/ChemicalManagement/LotDetails/{lotId}
        [HttpGet("LotDetails/{lotId}")]
        public async Task<IActionResult> GetLotDetails(int lotId)
        {
            var lotDetails = await _context.LoHoaChat
                .Where(l => l.MaLo == lotId)  // Tìm theo MaLo (id của lô hóa chất)
                .FirstOrDefaultAsync();

            if (lotDetails == null)
            {
                return NotFound("Lot not found.");
            }

            return Ok(lotDetails); // Trả về thông tin chi tiết của lô hóa chất
        }
        [HttpGet("{id}/TotalStock")]
        public async Task<IActionResult> GetTotalStockByChemical(int id)
        {
            // Tìm tất cả các lô hóa chất liên quan đến MaHoaChat
            var totalStock = await _context.LoHoaChat
                .Where(l => l.MaHoaChat == id) // Lọc theo MaHoaChat
                .GroupBy(l => l.MaHoaChat)
                .Select(group => new
                {
                    MaHoaChat = group.Key, // Mã hóa chất
                    TenHoaChat = _context.HoaChat
                        .Where(h => h.MaHoaChat == group.Key)
                        .Select(h => h.TenHoaChat)
                        .FirstOrDefault(), // Tên hóa chất
                    TongSoLuongTon = group.Sum(l => l.SoLuongTon) // Tổng số lượng tồn của tất cả các lô
                })
                .FirstOrDefaultAsync();

            // Kiểm tra nếu không tìm thấy dữ liệu
            if (totalStock == null)
            {

                return NotFound($"No stock data found for chemical ID {id}.");
            }

            return Ok(totalStock); // Trả về kết quả
        }

        [HttpGet("Count")]
        public async Task<IActionResult> GetTotalChemicalCount()
        {
            var totalChemicals = await _context.HoaChat.CountAsync();
            return Ok(new { TotalChemicals = totalChemicals });
        }
        [HttpGet("{id}/TotalLots")]
        public async Task<IActionResult> GetTotalLotsByChemical(int id)
        {
            // Lấy tất cả các lô hóa chất liên quan đến MaHoaChat
            var totalLots = await _context.LoHoaChat
                .Where(l => l.MaHoaChat == id) // Lọc theo MaHoaChat
                .CountAsync(); // Đếm số lượng lô

            // Kiểm tra nếu không có lô nào được tìm thấy
            if (totalLots == 0)
            {
                return NotFound($"No lots found for chemical ID {id}.");
            }

            // Trả về tổng số lô
            return Ok(new
            {
                MaHoaChat = id,
                TotalLots = totalLots
            });
        }
    }


}
