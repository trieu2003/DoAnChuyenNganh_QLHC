using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using System.ComponentModel.DataAnnotations;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly YourDbContext _context;
        private readonly ILogger<LoginController> _logger;


        public LoginController(YourDbContext context, ILogger<LoginController> logger)
        {
            _context = context;
            _logger = logger;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            _logger.LogInformation("Starting Login method");

            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
            if (user == null)
            {
                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
            }

            if (!VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
            {
                _logger.LogWarning("Password does not match for user.");
                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
            }

            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";
            _logger.LogInformation("Login successful.");

            return Ok(new
            {
                Message = "Đăng nhập thành công",
                UserId = user.MaNguoiDung,
                UserName = user.TenDangNhap,
                tenNguoiDung =user.TenNguoiDung,
                VaiTro = user.VaiTro,
                RedirectUrl = redirectUrl
            });
        }


        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            _logger.LogInformation("Starting ChangePassword method");

            if (request.NewPassword != request.ConfirmNewPassword)
            {
                _logger.LogWarning("New password and confirmation password do not match.");
                return BadRequest(new { Message = "Mật khẩu mới và xác nhận mật khẩu không khớp." });
            }

            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
            if (user == null)
            {
                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
                return Unauthorized(new { Message = "Tên đăng nhập không đúng." });
            }

            if (!VerifyMd5Hash(request.CurrentPassword, user.MatKhauHash))
            {
                _logger.LogWarning("Current password does not match the stored password hash.");
                return Unauthorized(new { Message = "Mật khẩu hiện tại không đúng." });
            }

            user.MatKhauHash = GenerateMd5Hash(request.NewPassword);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Password changed successfully.");
            return Ok(new { Message = "Đổi mật khẩu thành công." });
        }

        [HttpGet("Getusers")]
        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
        {
            _logger.LogInformation("Fetching all users.");
            return await _context.NguoiDung.ToListAsync();
        }

        private bool VerifyMd5Hash(string input, string storedHash)
        {
            using (var md5 = MD5.Create())
            {
                var inputBytes = Encoding.UTF8.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);
                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

                _logger.LogInformation($"Computed MD5 hash for input '{input}' is '{hash}', comparing with stored hash '{storedHash}'.");

                return hash == storedHash;
            }
        }

        private string GenerateMd5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var inputBytes = Encoding.UTF8.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
        [HttpPut("update-email/{userId}")]
        public async Task<IActionResult> UpdateUserEmail(int userId, [FromBody] UpdateUserEmailRequest request)
        {
            _logger.LogInformation($"Starting UpdateUserEmail method for userId {userId}");

            // Lấy thông tin người dùng từ cơ sở dữ liệu
            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.MaNguoiDung == userId);
            if (user == null)
            {
                _logger.LogWarning($"User with ID {userId} not found.");
                return NotFound(new { Message = "Người dùng không tồn tại." });
            }

            // Cập nhật email của người dùng
            if (!string.IsNullOrEmpty(request.Email))
            {
                user.Email = request.Email;
            }

            // Lưu lại các thay đổi vào cơ sở dữ liệu
            try
            {
                _context.NguoiDung.Update(user);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"User email updated successfully for userId {userId}");
                return Ok(new { Message = "Cập nhật email người dùng thành công." });
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while updating user email: {ex.Message}");
                return StatusCode(500, new { Message = "Lỗi khi cập nhật email người dùng." });
            }
        }
    

    }

    public class UpdateUserEmailRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

    public class LoginRequest
    {
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
    }

    public class ChangePasswordRequest
    {
        public string TenDangNhap { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }

    public class OtpRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }
}

