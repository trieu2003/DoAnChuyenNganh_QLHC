using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeXuatController : ControllerBase
    {
        private readonly YourDbContext _context;
        public DeXuatController(YourDbContext context)
        {
            _context = context;
        }
        // API tạo Phiếu Đề Xuất
        [HttpPost("create")]
        public async Task<IActionResult> CreateDeXuat([FromBody] PhieuDeXuat phieuDeXuat)
        {
            if (phieuDeXuat == null)
            {
                return BadRequest("Thông tin phiếu đề xuất không hợp lệ.");
            }
            try
            {
                phieuDeXuat.NgayTao = DateTime.Now;
                // Lưu PhieuDeXuat
                _context.PhieuDeXuat.Add(phieuDeXuat);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(CreateDeXuat), new { id = phieuDeXuat.MaPhieuDX }, phieuDeXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi tạo phiếu đề xuất.",
                    Error = ex.Message
                });
            }
        }

        // API tạo Chi Tiết Đề Xuất
        [HttpPost("create-details")]
        public async Task<IActionResult> CreateChiTietDeXuat([FromBody] List<ChiTietDeXuat> chiTietDeXuat)
        {
            if (chiTietDeXuat == null || chiTietDeXuat.Count == 0)
            {
                return BadRequest("Thông tin chi tiết đề xuất không hợp lệ.");
            }
            //if (chiTietDeXuat.Any(ct => ct.SoLuong <= 0 || ct.DonGia <= 0))
            //{
            //    return BadRequest("Số lượng và đơn giá phải lớn hơn 0.");
            //}

            // Kiểm tra xem tất cả MaPhieuDX có tồn tại không
            var maPhieuDXs = chiTietDeXuat.Select(ct => ct.MaPhieuDX).Distinct().ToList();
            var existingMaPhieuDXs = _context.PhieuDeXuat
                                            .Where(pd => maPhieuDXs.Contains(pd.MaPhieuDX))
                                            .Select(pd => pd.MaPhieuDX)
                                            .ToList();

            if (existingMaPhieuDXs.Count != maPhieuDXs.Count)
            {
                return BadRequest("Một hoặc nhiều mã phiếu đề xuất không tồn tại.");
            }

            // Lưu ChiTietDeXuat
            _context.ChiTietDeXuat.AddRange(chiTietDeXuat);
            await _context.SaveChangesAsync();

            return Ok(chiTietDeXuat);
        }
        // API hiển thị thông tin đề xuất mua mới và chi tiết
        [HttpGet("details/{maPhieuDX}")]
        public async Task<IActionResult> GetDeXuatDetails(int maPhieuDX)
        {
            try
            {
                var phieuDeXuat = await _context.PhieuDeXuat
                    .Where(p => p.MaPhieuDX == maPhieuDX)
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.LyDo,
                        p.TrangThai,
                        p.NgayTao,
                        p.MaNguoiDung,
                        ChiTietDeXuat = _context.ChiTietDeXuat
                            .Where(c => c.MaPhieuDX == p.MaPhieuDX)
                            .OrderByDescending(c => c.MaHoaChat) // Sắp xếp nếu cần (MaHoaChat là placeholder)
                            .Select(c => new
                            {
                                c.MaHoaChat,
                                TenHoaChat = _context.HoaChat
                            .Where(h => h.MaHoaChat == c.MaHoaChat)  // Join với bảng HoaChat
                            .Select(h => h.TenHoaChat)
                            .FirstOrDefault(),
                                c.SoLuong,
                                DonViTinh = _context.HoaChat
                            .Where(h => h.MaHoaChat == c.MaHoaChat)  // Join với bảng HoaChat
                            .Select(h => h.DonVi).FirstOrDefault(),
                                c.DonGia,

                            }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (phieuDeXuat == null)
                {
                    return NotFound(new { Message = "Phiếu đề xuất không tồn tại." });
                }

                return Ok(phieuDeXuat);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy thông tin đề xuất.",
                    Error = ex.Message
                });
            }
        }

        // API hiển thị danh sách tất cả các phiếu đề xuất và chi tiết
        [HttpGet("all-details")]
        public async Task<IActionResult> GetAllDeXuatDetails()
        {
            try
            {
                var deXuatDetails = await _context.PhieuDeXuat
                    .OrderByDescending(p => p.NgayTao) // Sắp xếp theo NgayTao
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.LyDo,
                        p.TrangThai,
                        p.NgayTao,
                        UserName = _context.NguoiDung.Where(h => h.MaNguoiDung == p.MaNguoiDung).Select(h => h.TenDangNhap).FirstOrDefault(),
                        ChiTietDeXuat = _context.ChiTietDeXuat
                            .Where(c => c.MaPhieuDX == p.MaPhieuDX)
                            .OrderByDescending(c => c.MaHoaChat) // Nếu cần, thay bằng trường khác
                            .Select(c => new
                            {
                                c.MaHoaChat,
                                TenHoaChat = _context.HoaChat
                            .Where(h => h.MaHoaChat == c.MaHoaChat)  // Join với bảng HoaChat
                            .Select(h => h.TenHoaChat)
                            .FirstOrDefault(),
                                c.SoLuong,
                                DonViTinh = _context.HoaChat
                            .Where(h => h.MaHoaChat == c.MaHoaChat)  // Join với bảng HoaChat
                            .Select(h => h.DonVi).FirstOrDefault(),
                                c.DonGia,

                            }).ToList()
                    })
                    .ToListAsync();

                return Ok(deXuatDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách phiếu đề xuất.",
                    Error = ex.Message
                });
            }
        }
        [HttpGet("user-details")]
        public async Task<IActionResult> GetDeXuatByUser([FromQuery] int createdBy)
        {
            try
            {
                var deXuatDetails = await _context.PhieuDeXuat
                    .Where(p => p.MaNguoiDung == createdBy) // Lọc theo người dùng
                    .OrderByDescending(p => p.NgayTao)     // Sắp xếp theo NgayTao
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.LyDo,
                        p.TrangThai,
                        p.NgayTao,
                        p.MaNguoiDung,
                        ChiTietDeXuat = _context.ChiTietDeXuat
                            .Where(c => c.MaPhieuDX == p.MaPhieuDX)
                            .OrderByDescending(c => c.MaHoaChat) // Nếu cần, thay bằng trường khác
                            .Select(c => new
                            {
                                c.MaHoaChat,
                                c.SoLuong,
                                c.DonGia
                            }).ToList()
                    })
                    .ToListAsync();

                if (deXuatDetails == null || !deXuatDetails.Any())
                {
                    return NotFound(new { Message = "Không có phiếu đề xuất nào cho người dùng này." });
                }

                return Ok(deXuatDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách phiếu đề xuất theo người dùng.",
                    Error = ex.Message
                });
            }
        }
        [HttpPut("updatePhieuDeXuat/{maPhieuDX}")]
        public async Task<IActionResult> UpdatePhieuDeXuat(int maPhieuDX, [FromBody] PhieuDeXuat updatedPhieuDeXuat)
        {
            if (maPhieuDX != updatedPhieuDeXuat.MaPhieuDX)
            {
                return BadRequest("Mã phiếu đề xuất không hợp lệ.");
            }

            var existingPhieuDeXuat = await _context.PhieuDeXuat.FindAsync(maPhieuDX);
            if (existingPhieuDeXuat == null)
            {
                return NotFound("Không tìm thấy phiếu đề xuất.");
            }

            existingPhieuDeXuat.LyDo = updatedPhieuDeXuat.LyDo;
            existingPhieuDeXuat.NgayTao = DateTime.Now;  // Cập nhật NgàyTao
            existingPhieuDeXuat.TrangThai = updatedPhieuDeXuat.TrangThai;
            existingPhieuDeXuat.MaNguoiDung = updatedPhieuDeXuat.MaNguoiDung;

            await _context.SaveChangesAsync();

            return NoContent();  // Trả về trạng thái thành công nhưng không có nội dung
        }
        [HttpPut("updateChiTietDeXuat/{maPhieuDX}/{maHoaChat}")]
        public async Task<IActionResult> UpdateChiTietDeXuat(int maPhieuDX, int maHoaChat, [FromBody] ChiTietDeXuat updatedChiTiet)
        {
            var existingChiTiet = await _context.ChiTietDeXuat
                .Where(x => x.MaPhieuDX == maPhieuDX && x.MaHoaChat == maHoaChat)
                .FirstOrDefaultAsync();

            if (existingChiTiet == null)
            {
                return NotFound("Không tìm thấy chi tiết đề xuất.");
            }

            existingChiTiet.SoLuong = updatedChiTiet.SoLuong;
            existingChiTiet.DonGia = updatedChiTiet.DonGia;

            await _context.SaveChangesAsync();

            return NoContent();  // Trả về trạng thái thành công nhưng không có nội dung
        }


        [HttpGet("all-detailsUser")]
        public async Task<IActionResult> GetAllDeXuatDetailsUser()
        {
            try
            {
                var deXuatDetails = await _context.PhieuDeXuat
                    .OrderByDescending(p => p.NgayTao) // Sắp xếp theo NgayTao
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.LyDo,
                        p.TrangThai,
                        p.NgayTao,
                        UserName = _context.NguoiDung.Where(h => h.MaNguoiDung == p.MaNguoiDung).Select(h => h.TenDangNhap).FirstOrDefault(),
                        ChiTietDeXuat = _context.ChiTietDeXuat
                            .Where(c => c.MaPhieuDX == p.MaPhieuDX)
                            .OrderByDescending(c => c.MaHoaChat) // Nếu cần, thay bằng trường khác
                            .Select(c => new
                            {
                                c.MaHoaChat,
                                TenHoaChat = _context.HoaChat
                            .Where(h => h.MaHoaChat == c.MaHoaChat)  // Join với bảng HoaChat
                            .Select(h => h.TenHoaChat)
                            .FirstOrDefault(),
                                c.SoLuong,
                                c.DonGia
                            }).ToList()
                    })
                    .ToListAsync();

                return Ok(deXuatDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách phiếu đề xuất.",
                    Error = ex.Message
                });
            }
        }
        [HttpGet("getPhieuDeXuatDangChoDuyet")]
        public async Task<IActionResult> GetPhieuDeXuatDangChoDuyet()
        {
            try
            {
                var result = await _context.PhieuDeXuat
                    .Where(p => p.TrangThai == "Chờ duyệt") // Lọc các phiếu Đề xuất có trạng thái 'Chờ duyệt'
                    .OrderByDescending(p => p.NgayTao)
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.MaNguoiDung,
                        UserName = _context.NguoiDung.Where(h => h.MaNguoiDung == p.MaNguoiDung)
                                                     .Select(h => h.TenDangNhap)
                                                     .FirstOrDefault(), // Lấy TenDangNhap thay vì MaNguoiDung
                        p.TrangThai,
                        p.NgayTao,
                        ChiTietDeXuat = _context.ChiTietDeXuat
                                               .Where(ct => ct.MaPhieuDX == p.MaPhieuDX)
                                               .Select(ct => new
                                               {
                                                   ct.MaHoaChat,
                                                   TenHoaChat = _context.HoaChat
                                                    .Where(h => h.MaHoaChat == ct.MaHoaChat)  // Join với bảng HoaChat
                                                    .Select(h => h.TenHoaChat)
                                                    .FirstOrDefault(),
                                                   ct.SoLuong,
                                                   DonViTinh = _context.HoaChat
                                                    .Where(h => h.MaHoaChat == ct.MaHoaChat)  // Join với bảng HoaChat
                                                    .Select(h => h.DonVi).FirstOrDefault(),
                                                   ct.DonGia
                                               })
                                               .ToList()
                    })
                    .ToListAsync();

                if (result == null || result.Count == 0)
                {
                    return NotFound("Không có phiếu đề xuất nào với trạng thái 'Chờ duyệt'.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }
        [HttpGet("getPhieuDeXuatDaDuyet")]
        public async Task<IActionResult> GetPhieuDeXuatDaDuyet()
        {
            try
            {
                var result = await _context.PhieuDeXuat
                    .Where(p => p.TrangThai == "Đã duyệt") // Lọc các phiếu Đề xuất có trạng thái 'Chờ duyệt'
                    .OrderByDescending(p => p.NgayTao)
                    .Select(p => new
                    {
                        p.MaPhieuDX,
                        p.MaNguoiDung,
                        UserName = _context.NguoiDung.Where(h => h.MaNguoiDung == p.MaNguoiDung)
                                                     .Select(h => h.TenDangNhap)
                                                     .FirstOrDefault(), // Lấy TenDangNhap thay vì MaNguoiDung
                        p.TrangThai,
                        p.NgayTao,
                        ChiTietDeXuat = _context.ChiTietDeXuat
                                               .Where(ct => ct.MaPhieuDX == p.MaPhieuDX)
                                               .Select(ct => new
                                               {
                                                   ct.MaHoaChat,
                                                   TenHoaChat = _context.HoaChat
                                                    .Where(h => h.MaHoaChat == ct.MaHoaChat)  // Join với bảng HoaChat
                                                    .Select(h => h.TenHoaChat)
                                                    .FirstOrDefault(),
                                                   ct.SoLuong,
                                                   DonViTinh = _context.HoaChat
                                                    .Where(h => h.MaHoaChat == ct.MaHoaChat)  // Join với bảng HoaChat
                                                    .Select(h => h.DonVi).FirstOrDefault(),
                                                   ct.DonGia
                                               })
                                               .ToList()
                    })
                    .ToListAsync();

                if (result == null || result.Count == 0)
                {
                    return NotFound("Không có phiếu đề xuất nào với trạng thái 'Chờ duyệt'.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }


        [HttpPut("update-and-approve/{maPhieuDX}")]
        public async Task<IActionResult> UpdateAndApproveAsync(int maPhieuDX, [FromBody] DuyetPhieuDX request)
        {
            if (request == null) return BadRequest("Invalid request data.");

            // Kiểm tra xem mã phiếu có tồn tại trong bảng PhieuDeXuat không
            var phieuDeXuat = await _context.PhieuDeXuat
                .FirstOrDefaultAsync(p => p.MaPhieuDX == maPhieuDX);

            if (phieuDeXuat == null)
            {
                return NotFound("PhieuDeXuat not found.");
            }

            // Bắt đầu transaction trong DbContext
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Cập nhật PhieuDeXuat
                    var updateQuery = @"
                        UPDATE PhieuDeXuat 
                        SET TrangThai = @TrangThaiPhieu
                        WHERE MaPhieuDX = @MaPhieuDX";
                    await _context.Database.ExecuteSqlRawAsync(updateQuery,
                        new SqlParameter("@TrangThaiPhieu", request.TrangThai),
                        new SqlParameter("@MaPhieuDX", maPhieuDX));

                    // Thêm vào DuyetPhieuDX
                    var insertQuery = @"
                        INSERT INTO DuyetPhieuDX (MaPhieuDX, MaNguoiDung, NgayDuyet, TrangThai)
                        VALUES (@MaPhieuDX, @MaNguoiDung, @NgayDuyet, @TrangThai)";
                    await _context.Database.ExecuteSqlRawAsync(insertQuery,
                        new SqlParameter("@MaPhieuDX", maPhieuDX),
                        new SqlParameter("@MaNguoiDung", request.MaNguoiDung),
                        new SqlParameter("@NgayDuyet", DateTime.Now),
                        new SqlParameter("@TrangThai", request.TrangThai));

                    // Commit transaction
                    await transaction.CommitAsync();
                    return Ok("Update and approval completed successfully.");
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        }



    }
}
