using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.EntityFrameworkCore;

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

    }
}
