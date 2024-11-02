using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;
using System.Text;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly YourDbContext _context;

        public LoginController(YourDbContext context)
        {
            _context = context;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Kiểm tra người dùng
            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
            if (user == null)
            {
                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
            }

            // Đăng nhập thành công, có thể trả về thông tin người dùng hoặc token (nếu có)
            return Ok(new
            {
                Message = "Đăng nhập thành công",
                UserId = user.MaNguoiDung, // trả về ID người dùng
                UserName = user.TenDangNhap // trả về tên đăng nhập
            });
        }
        // Phương thức GET để lấy danh sách người dùng
        // GET: api/NguoiDung
        [HttpGet("Getusers")]
        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
        {
            return await _context.NguoiDung.ToListAsync();
        }
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<HoaChat>>> GetHoaChat()
        //{
        //    return await _context.HoaChat.ToListAsync();
        //}
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            using (var hmac = new HMACSHA256())
            {
                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = Convert.ToBase64String(hashBytes);
                return hash == storedHash;
            }
        }
    }
    public class LoginRequest
    {
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
    }
}
