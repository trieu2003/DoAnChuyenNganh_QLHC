using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;

namespace API_QLHC_DOAN.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThongKeController : ControllerBase
    {
        private readonly YourDbContext _context;

        public ThongKeController(YourDbContext context)
        {
            _context = context;
        }

        [HttpGet("hoa-chat")]
        public IActionResult ThongKeHoaChat()
        {
            var thongKe = _context.HoaChat
                .GroupBy(h => h.TenHoaChat)
                .Select(g => new
                {
                    TenHoaChat = g.Key,
                    SoLuong = g.Count()
                })
                .ToList();

            return Ok(thongKe);
        }
    }

}
