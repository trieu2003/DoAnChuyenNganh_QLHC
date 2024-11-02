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

        // GET: api/ChemicalManagement
        [HttpGet("GetHoaChat")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> GetChemicals()
        {
            var chemicals = await _context.HoaChat.ToListAsync();
            return Ok(chemicals);
        }
        // GET: api/ChemicalManagement/Search?name=ChemicalName
        [HttpGet("SearchHoaChat")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> SearchChemicals(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Search term cannot be empty.");
            }

            var chemicals = await _context.HoaChat
                .Where(c => c.TenHoaChat.Contains(name)) // Tìm kiếm theo tên hóa chất
                .ToListAsync();

            if (chemicals.Count == 0)
            {
                return NotFound("No chemicals found matching the search term.");
            }

            return Ok(chemicals);
        }
    }
}
