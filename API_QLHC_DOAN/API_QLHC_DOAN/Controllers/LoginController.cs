////////////using API_QLHC_DOAN.Data;
////////////using API_QLHC_DOAN.Models;
////////////using Microsoft.AspNetCore.Http;
////////////using Microsoft.AspNetCore.Identity.Data;
////////////using Microsoft.AspNetCore.Mvc;
////////////using Microsoft.EntityFrameworkCore;
////////////using System;
////////////using System.Security.Cryptography;
////////////using System.Text;

////////////namespace API_QLHC_DOAN.Controllers
////////////{
////////////    [Route("api/[controller]")]
////////////    [ApiController]
////////////    public class LoginController : ControllerBase
////////////    {
////////////        private readonly YourDbContext _context;

////////////        public LoginController(YourDbContext context)
////////////        {
////////////            _context = context;
////////////        }
////////////        [HttpPost("login")]
////////////        public async Task<IActionResult> Login([FromBody] LoginRequest request)
////////////        {
////////////            // Kiểm tra người dùng
////////////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
////////////            if (user == null)
////////////            {
////////////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
////////////            }

////////////            // Đăng nhập thành công, có thể trả về thông tin người dùng hoặc token (nếu có)
////////////            return Ok(new
////////////            {
////////////                Message = "Đăng nhập thành công",
////////////                UserId = user.MaNguoiDung, // trả về ID người dùng
////////////                UserName = user.TenDangNhap, // trả về tên đăng nhập
////////////                VaiTro=user.VaiTro             // trả về vai trò của người dù
////////////            });
////////////        }
////////////        // Phương thức GET để lấy danh sách người dùng
////////////        // GET: api/NguoiDung
////////////        [HttpGet("Getusers")]
////////////        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
////////////        {
////////////            return await _context.NguoiDung.ToListAsync();
////////////        }
////////////        private bool VerifyPasswordHash(string password, string storedHash)
////////////        {
////////////            using (var hmac = new HMACSHA256())
////////////            {
////////////                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
////////////                var hash = Convert.ToBase64String(hashBytes);
////////////                return hash == storedHash;
////////////            }
////////////        }
////////////    }
////////////    public class LoginRequest
////////////    {
////////////        public string TenDangNhap { get; set; }
////////////        public string MatKhau { get; set; }


////////////    }
////////////}

//////////using API_QLHC_DOAN.Data;
//////////using API_QLHC_DOAN.Models;
//////////using Microsoft.AspNetCore.Mvc;
//////////using Microsoft.EntityFrameworkCore;
//////////using System.Collections.Generic;
//////////using System.Security.Cryptography;
//////////using System.Text;
//////////using System.Threading.Tasks;

//////////namespace API_QLHC_DOAN.Controllers
//////////{
//////////    [Route("api/[controller]")]
//////////    [ApiController]
//////////    public class LoginController : ControllerBase
//////////    {
//////////        private readonly YourDbContext _context;

//////////        public LoginController(YourDbContext context)
//////////        {
//////////            _context = context;
//////////        }

//////////        [HttpPost("login")]
//////////        public async Task<IActionResult> Login([FromBody] LoginRequest request)
//////////        {
//////////            // Kiểm tra người dùng
//////////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
//////////            if (user == null || !VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
//////////            {
//////////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
//////////            }

//////////            // Phân quyền dựa trên vai trò
//////////            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";

//////////            return Ok(new
//////////            {
//////////                Message = "Đăng nhập thành công",
//////////                UserId = user.MaNguoiDung, // trả về ID người dùng
//////////                UserName = user.TenDangNhap, // trả về tên đăng nhập
//////////                VaiTro = user.VaiTro,       // trả về vai trò của người dùng
//////////                RedirectUrl = redirectUrl
//////////            });
//////////        }

//////////        // Phương thức GET để lấy danh sách người dùng
//////////        // GET: api/NguoiDung
//////////        [HttpGet("Getusers")]
//////////        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
//////////        {
//////////            return await _context.NguoiDung.ToListAsync();
//////////        }

//////////        private bool VerifyMd5Hash(string input, string storedHash)
//////////        {
//////////            using (var md5 = MD5.Create())
//////////            {
//////////                var inputBytes = Encoding.UTF8.GetBytes(input);
//////////                var hashBytes = md5.ComputeHash(inputBytes);
//////////                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
//////////                return hash == storedHash;
//////////            }
//////////        }
//////////    }

//////////    public class LoginRequest
//////////    {
//////////        public string TenDangNhap { get; set; }
//////////        public string MatKhau { get; set; }
//////////    }
//////////}
////////using API_QLHC_DOAN.Data;
////////using API_QLHC_DOAN.Models;
////////using Microsoft.AspNetCore.Mvc;
////////using Microsoft.EntityFrameworkCore;
////////using System.Collections.Generic;
////////using System.Security.Cryptography;
////////using System.Text;
////////using System.Threading.Tasks;

////////namespace API_QLHC_DOAN.Controllers
////////{
////////    [Route("api/[controller]")]
////////    [ApiController]
////////    public class LoginController : ControllerBase
////////    {
////////        private readonly YourDbContext _context;

////////        public LoginController(YourDbContext context)
////////        {
////////            _context = context;
////////        }

////////        [HttpPost("login")]
////////        public async Task<IActionResult> Login([FromBody] LoginRequest request)
////////        {
////////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
////////            if (user == null || !VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
////////            {
////////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
////////            }

////////            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";

////////            return Ok(new
////////            {
////////                Message = "Đăng nhập thành công",
////////                UserId = user.MaNguoiDung,
////////                UserName = user.TenDangNhap,
////////                VaiTro = user.VaiTro,
////////                RedirectUrl = redirectUrl
////////            });
////////        }

////////        // Đổi mật khẩu
////////        [HttpPost("change-password")]
////////        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
////////        {
////////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
////////            if (user == null || !VerifyMd5Hash(request.CurrentPassword, user.MatKhauHash))
////////            {
////////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu hiện tại không đúng." });
////////            }

////////            // Tạo mật khẩu mới với hàm băm MD5
////////            user.MatKhauHash = GenerateMd5Hash(request.NewPassword);
////////            await _context.SaveChangesAsync();

////////            return Ok(new { Message = "Đổi mật khẩu thành công." });
////////        }

////////        [HttpGet("Getusers")]
////////        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
////////        {
////////            return await _context.NguoiDung.ToListAsync();
////////        }

////////        private bool VerifyMd5Hash(string input, string storedHash)
////////        {
////////            using (var md5 = MD5.Create())
////////            {
////////                var inputBytes = Encoding.UTF8.GetBytes(input);
////////                var hashBytes = md5.ComputeHash(inputBytes);
////////                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
////////                return hash == storedHash;
////////            }
////////        }

////////        private string GenerateMd5Hash(string input)
////////        {
////////            using (var md5 = MD5.Create())
////////            {
////////                var inputBytes = Encoding.UTF8.GetBytes(input);
////////                var hashBytes = md5.ComputeHash(inputBytes);
////////                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
////////            }
////////        }
////////    }

////////    public class LoginRequest
////////    {
////////        public string TenDangNhap { get; set; }
////////        public string MatKhau { get; set; }
////////    }

////////    public class ChangePasswordRequest
////////    {
////////        public string TenDangNhap { get; set; }
////////        public string CurrentPassword { get; set; }
////////        public string NewPassword { get; set; }
////////    }
////////}

//////using API_QLHC_DOAN.Data;
//////using API_QLHC_DOAN.Models;
//////using Microsoft.AspNetCore.Mvc;
//////using Microsoft.EntityFrameworkCore;
//////using System.Collections.Generic;
//////using System.Security.Cryptography;
//////using System.Text;
//////using System.Threading.Tasks;

//////namespace API_QLHC_DOAN.Controllers
//////{
//////    [Route("api/[controller]")]
//////    [ApiController]
//////    public class LoginController : ControllerBase
//////    {
//////        private readonly YourDbContext _context;

//////        public LoginController(YourDbContext context)
//////        {
//////            _context = context;
//////        }

//////        [HttpPost("login")]
//////        public async Task<IActionResult> Login([FromBody] LoginRequest request)
//////        {
//////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
//////            if (user == null || !VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
//////            {
//////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
//////            }

//////            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";

//////            return Ok(new
//////            {
//////                Message = "Đăng nhập thành công",
//////                UserId = user.MaNguoiDung,
//////                UserName = user.TenDangNhap,
//////                VaiTro = user.VaiTro,
//////                RedirectUrl = redirectUrl
//////            });
//////        }

//////        // Đổi mật khẩu
//////        [HttpPost("change-password")]
//////        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
//////        {
//////            // Kiểm tra mật khẩu mới và mật khẩu xác nhận
//////            if (request.NewPassword != request.ConfirmNewPassword)
//////            {
//////                return BadRequest(new { Message = "Mật khẩu mới và xác nhận mật khẩu không khớp." });
//////            }

//////            // Xác thực tài khoản
//////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
//////            if (user == null || !VerifyMd5Hash(request.CurrentPassword, user.MatKhauHash))
//////            {
//////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu hiện tại không đúng." });
//////            }

//////            // Tạo mật khẩu mới với hàm băm MD5
//////            user.MatKhauHash = GenerateMd5Hash(request.NewPassword);
//////            await _context.SaveChangesAsync();

//////            return Ok(new { Message = "Đổi mật khẩu thành công." });
//////        }

//////        [HttpGet("Getusers")]
//////        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
//////        {
//////            return await _context.NguoiDung.ToListAsync();
//////        }

//////        private bool VerifyMd5Hash(string input, string storedHash)
//////        {
//////            using (var md5 = MD5.Create())
//////            {
//////                var inputBytes = Encoding.UTF8.GetBytes(input);
//////                var hashBytes = md5.ComputeHash(inputBytes);
//////                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
//////                return hash == storedHash;
//////            }
//////        }

//////        private string GenerateMd5Hash(string input)
//////        {
//////            using (var md5 = MD5.Create())
//////            {
//////                var inputBytes = Encoding.UTF8.GetBytes(input);
//////                var hashBytes = md5.ComputeHash(inputBytes);
//////                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
//////            }
//////        }
//////    }

//////    public class LoginRequest
//////    {
//////        public string TenDangNhap { get; set; }
//////        public string MatKhau { get; set; }
//////    }

//////    public class ChangePasswordRequest
//////    {
//////        public string TenDangNhap { get; set; }
//////        public string CurrentPassword { get; set; }
//////        public string NewPassword { get; set; }
//////        public string ConfirmNewPassword { get; set; } // Thêm trường xác nhận mật khẩu mới
//////    }
//////}


////using API_QLHC_DOAN.Data;
////using API_QLHC_DOAN.Models;
////using Microsoft.AspNetCore.Mvc;
////using Microsoft.EntityFrameworkCore;
////using Microsoft.Extensions.Logging;
////using System.Collections.Generic;
////using System.Security.Cryptography;
////using System.Text;
////using System.Threading.Tasks;

////namespace API_QLHC_DOAN.Controllers
////{
////    [Route("api/[controller]")]
////    [ApiController]
////    public class LoginController : ControllerBase
////    {
////        private readonly YourDbContext _context;
////        private readonly ILogger<LoginController> _logger;

////        public LoginController(YourDbContext context, ILogger<LoginController> logger)
////        {
////            _context = context;
////            _logger = logger;
////        }

////        [HttpPost("login")]
////        public async Task<IActionResult> Login([FromBody] LoginRequest request)
////        {
////            _logger.LogInformation("Starting Login method");

////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
////            if (user == null)
////            {
////                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
////            }

////            if (!VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
////            {
////                _logger.LogWarning("Password does not match for user.");
////                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
////            }

////            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";
////            _logger.LogInformation("Login successful.");

////            return Ok(new
////            {
////                Message = "Đăng nhập thành công",
////                UserId = user.MaNguoiDung,
////                UserName = user.TenDangNhap,
////                VaiTro = user.VaiTro,
////                RedirectUrl = redirectUrl
////            });
////        }

////        // Đổi mật khẩu
////        [HttpPost("change-password")]
////        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
////        {
////            _logger.LogInformation("Starting ChangePassword method");

////            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
////            if (request.NewPassword != request.ConfirmNewPassword)
////            {
////                _logger.LogWarning("New password and confirmation password do not match.");
////                return BadRequest(new { Message = "Mật khẩu mới và xác nhận mật khẩu không khớp." });
////            }

////            // Xác thực tài khoản
////            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
////            if (user == null)
////            {
////                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
////                return Unauthorized(new { Message = "Tên đăng nhập không đúng." });
////            }

////            if (!VerifyMd5Hash(request.CurrentPassword, user.MatKhauHash))
////            {
////                _logger.LogWarning("Current password does not match the stored password hash.");
////                return Unauthorized(new { Message = "Mật khẩu hiện tại không đúng." });
////            }

////            // Tạo mật khẩu mới với hàm băm MD5
////            user.MatKhauHash = GenerateMd5Hash(request.NewPassword);
////            await _context.SaveChangesAsync();

////            _logger.LogInformation("Password changed successfully.");
////            return Ok(new { Message = "Đổi mật khẩu thành công." });
////        }

////        // Lấy danh sách người dùng
////        [HttpGet("Getusers")]
////        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
////        {
////            _logger.LogInformation("Fetching all users.");
////            return await _context.NguoiDung.ToListAsync();
////        }

////        // Phương thức hỗ trợ xác minh mật khẩu MD5
////        private bool VerifyMd5Hash(string input, string storedHash)
////        {
////            using (var md5 = MD5.Create())
////            {
////                var inputBytes = Encoding.UTF8.GetBytes(input);
////                var hashBytes = md5.ComputeHash(inputBytes);
////                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

////                _logger.LogInformation($"Computed MD5 hash for input '{input}' is '{hash}', comparing with stored hash '{storedHash}'.");

////                return hash == storedHash;
////            }
////        }

////        // Phương thức hỗ trợ tạo hash MD5
////        private string GenerateMd5Hash(string input)
////        {
////            using (var md5 = MD5.Create())
////            {
////                var inputBytes = Encoding.UTF8.GetBytes(input);
////                var hashBytes = md5.ComputeHash(inputBytes);
////                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
////            }
////        }
////    }

////    // Lớp yêu cầu đăng nhập
////    public class LoginRequest
////    {
////        public string TenDangNhap { get; set; }
////        public string MatKhau { get; set; }
////    }

////    // Lớp yêu cầu đổi mật khẩu
////    public class ChangePasswordRequest
////    {
////        public string TenDangNhap { get; set; }
////        public string CurrentPassword { get; set; }
////        public string NewPassword { get; set; }
////        public string ConfirmNewPassword { get; set; }
////    }
////}

//using API_QLHC_DOAN.Data;
//using API_QLHC_DOAN.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using System.Collections.Generic;
//using System.Security.Cryptography;
//using System.Text;
//using System.Threading.Tasks;

//namespace API_QLHC_DOAN.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//        private readonly YourDbContext _context;
//        private readonly ILogger<LoginController> _logger;

//        public LoginController(YourDbContext context, ILogger<LoginController> logger)
//        {
//            _context = context;
//            _logger = logger;
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginRequest request)
//        {
//            _logger.LogInformation("Starting Login method");

//            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
//            if (user == null)
//            {
//                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
//                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
//            }

//            if (!VerifyMd5Hash(request.MatKhau, user.MatKhauHash))
//            {
//                _logger.LogWarning("Password does not match for user.");
//                return Unauthorized(new { Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
//            }

//            var redirectUrl = user.VaiTro == "Admin" ? "/admin" : "/home";
//            _logger.LogInformation("Login successful.");

//            return Ok(new
//            {
//                Message = "Đăng nhập thành công",
//                UserId = user.MaNguoiDung,
//                UserName = user.TenDangNhap,
//                VaiTro = user.VaiTro,
//                RedirectUrl = redirectUrl
//            });
//        }

//        // Đổi mật khẩu
//        [HttpPost("change-password")]
//        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
//        {
//            _logger.LogInformation("Starting ChangePassword method");

//            // Kiểm tra mật khẩu mới và xác nhận mật khẩu
//            if (request.NewPassword != request.ConfirmNewPassword)
//            {
//                _logger.LogWarning("New password and confirmation password do not match.");
//                return BadRequest(new { Message = "Mật khẩu mới và xác nhận mật khẩu không khớp." });
//            }

//            // Xác thực tài khoản
//            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.TenDangNhap == request.TenDangNhap);
//            if (user == null)
//            {
//                _logger.LogWarning($"User with username {request.TenDangNhap} not found.");
//                return Unauthorized(new { Message = "Tên đăng nhập không đúng." });
//            }

//            if (!VerifyMd5Hash(request.CurrentPassword, user.MatKhauHash))
//            {
//                _logger.LogWarning("Current password does not match the stored password hash.");
//                return Unauthorized(new { Message = "Mật khẩu hiện tại không đúng." });
//            }

//            // Tạo mật khẩu mới với hàm băm MD5
//            user.MatKhauHash = GenerateMd5Hash(request.NewPassword);
//            await _context.SaveChangesAsync();

//            _logger.LogInformation("Password changed successfully.");
//            return Ok(new { Message = "Đổi mật khẩu thành công." });
//        }

//        [HttpGet("Getusers")]
//        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
//        {
//            _logger.LogInformation("Fetching all users.");
//            return await _context.NguoiDung.ToListAsync();
//        }

//        // Phương thức hỗ trợ xác minh mật khẩu MD5
//        private bool VerifyMd5Hash(string input, string storedHash)
//        {
//            using (var md5 = MD5.Create())
//            {
//                var inputBytes = Encoding.UTF8.GetBytes(input);
//                var hashBytes = md5.ComputeHash(inputBytes);
//                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

//                _logger.LogInformation($"Computed MD5 hash for input '{input}' is '{hash}', comparing with stored hash '{storedHash}'.");

//                return hash == storedHash;
//            }
//        }

//        // Phương thức hỗ trợ tạo hash MD5
//        private string GenerateMd5Hash(string input)
//        {
//            using (var md5 = MD5.Create())
//            {
//                var inputBytes = Encoding.UTF8.GetBytes(input);
//                var hashBytes = md5.ComputeHash(inputBytes);
//                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
//            }
//        }
//    }

//    // Lớp yêu cầu đăng nhập
//    public class LoginRequest
//    {
//        public string TenDangNhap { get; set; }
//        public string MatKhau { get; set; }
//    }

//    // Lớp yêu cầu đổi mật khẩu
//    public class ChangePasswordRequest
//    {
//        public string TenDangNhap { get; set; }
//        public string CurrentPassword { get; set; }
//        public string NewPassword { get; set; }
//        public string ConfirmNewPassword { get; set; }
//    }
//}
using API_QLHC_DOAN.Services;
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
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly YourDbContext _context;
        private readonly ILogger<LoginController> _logger;
        private readonly OtpService _otpService;
        private readonly EmailService _emailService;

        public LoginController(YourDbContext context, ILogger<LoginController> logger, OtpService otpService, EmailService emailService)
        {
            _context = context;
            _logger = logger;
            _otpService = otpService;
            _emailService = emailService;
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
                VaiTro = user.VaiTro,
                RedirectUrl = redirectUrl
            });
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] string email)
        {
            // Kiểm tra email có tồn tại không
            var user = await _context.NguoiDung.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return BadRequest(new { Message = "Email không tồn tại." });
            }

            // Tạo OTP và gửi qua email
            var otp = _otpService.GenerateOtp(email);
            await _emailService.SendEmailAsync(email, "Your OTP Code", $"Your OTP code is: {otp}");

            return Ok(new { Message = "OTP đã được gửi qua email." });
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] OtpRequest request)
        {
            var isOtpValid = _otpService.VerifyOtp(request.Email, request.Otp);
            if (isOtpValid)
            {
                return Ok(new { Message = "OTP hợp lệ." });
            }
            return BadRequest(new { Message = "OTP không hợp lệ." });
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

