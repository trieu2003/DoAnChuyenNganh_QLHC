using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly YourDbContext _context;

        public UsersController(YourDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NguoiDung>>> GetNguoiDung()
        {
            //return await _context.NguoiDung.ToListAsync();
            var nguoiDungs = await _context.NguoiDung
                                    .Where(nd => nd.VaiTro != "Admin")
                                    .ToListAsync();
            return nguoiDungs;
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<NguoiDung>> GetNguoiDung(int id)
        {
            var nguoiDung = await _context.NguoiDung.FindAsync(id);

            if (nguoiDung == null)
            {
                return NotFound();
            }

            return nguoiDung;
        }

        // POST: api/Users/{id}
        [HttpPost]
        public async Task<ActionResult<NguoiDung>> PostNguoiDung(NguoiDung nguoiDung)
        {
            nguoiDung.NgayTao = DateTime.Now;
            _context.NguoiDung.Add(nguoiDung);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNguoiDung), new { id = nguoiDung.MaNguoiDung }, nguoiDung);
        }
        [HttpPut("resetpassword/{id}")]
        public async Task<IActionResult> ResetPassword(int id)
        {
            try
            {
                // Lấy người dùng từ database
                var user = await _context.NguoiDung.FirstOrDefaultAsync(u => u.MaNguoiDung == id);

                if (user == null)
                {
                    return NotFound(new { Message = "Người dùng không tồn tại" });
                }

                // Tạo mật khẩu mặc định (mã hóa trước khi lưu vào database)
                
                string hashedPassword = "00c6ee2e21a7548de6260cf72c4f4b5b";

                // Cập nhật mật khẩu của người dùng
                user.MatKhauHash = hashedPassword;
                _context.NguoiDung.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Mật khẩu đã được reset thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Có lỗi xảy ra khi reset mật khẩu", Error = ex.Message });
            }
        }

        // PUT: api/Users/{id}
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutNguoiDung(int id, NguoiDung nguoiDung)
        //{
        //    if (id != nguoiDung.MaNguoiDung)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(nguoiDung).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!NguoiDungExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNguoiDung(int id, UpdateNguoiDungDTO updatedNguoiDung)
        {
            
            // Tìm đối tượng người dùng trong cơ sở dữ liệu
            var existingNguoiDung = await _context.NguoiDung.FindAsync(id);

            if (existingNguoiDung == null)
            {
                return NotFound();
            }

            // Chỉ cập nhật các trường cần thiết
            existingNguoiDung.TenDangNhap = updatedNguoiDung.TenDangNhap;
            existingNguoiDung.Email = updatedNguoiDung.Email;
            existingNguoiDung.NgayTao = DateTime.Now;
            _context.Entry(existingNguoiDung).State = EntityState.Modified;

            // Lưu các thay đổi
            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingNguoiDung);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NguoiDungExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNguoiDung(int id)
        {
            var nguoiDung = await _context.NguoiDung.FindAsync(id);
            if (nguoiDung == null)
            {
                return NotFound();
            }

            _context.NguoiDung.Remove(nguoiDung);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        //api/Users/{id}/phanquyen
        [HttpPut("{id}/phanquyen")]
        public async Task<IActionResult> PhanQuyenNguoiDung(int id, string vaiTro)
        {
            var nguoiDung = await _context.NguoiDung.FindAsync(id);
            if (nguoiDung == null)
            {
                return NotFound();
            }

            nguoiDung.VaiTro = vaiTro;  // Cập nhật vai trò
            _context.Entry(nguoiDung).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NguoiDungExists(int id)
        {
            return _context.NguoiDung.Any(e => e.MaNguoiDung == id);
        }
    }
}
