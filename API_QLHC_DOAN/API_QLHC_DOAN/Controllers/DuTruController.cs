//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using API_QLHC_DOAN.Data;
//using API_QLHC_DOAN.Models;
//using System.Linq;
//using System.Threading.Tasks;
//using System.Collections.Generic;

//namespace API_QLHC_DOAN.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DuTruController : ControllerBase
//    {
//        private readonly YourDbContext _context;

//        public DuTruController(YourDbContext context)
//        {
//            _context = context;
//        }

//        // POST api/du-tru/create-du-tru
//        [HttpPost("create-du-tru")]
//        public async Task<ActionResult> CreateDuTru([FromBody] CreateDuTruRequest request)
//        {
//            if (request == null || !request.DuTruHoaChatList.Any())
//            {
//                return BadRequest("Thông tin yêu cầu không hợp lệ.");
//            }

//            try
//            {
//                foreach (var duTru in request.DuTruHoaChatList)
//                {
//                    var newDuTru = new DuTru
//                    {
//                        MaHoaChat = duTru.MaHoaChat,
//                        MaBaiTN = duTru.MaBaiTN,
//                        SoLuong = duTru.SoLuong
//                    };
//                    _context.DuTru.Add(newDuTru);
//                }

//                await _context.SaveChangesAsync();

//                return Ok(new { Message = "Dự trù hóa chất cho bài thí nghiệm thành công." });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình tạo dự trù: " + ex.Message);
//            }
//        }

//        // GET api/du-tru
//        [HttpGet]
//        public async Task<ActionResult> GetAllDuTru()
//        {
//            try
//            {
//                var duTruList = await _context.DuTru
//                    .Include(d => d.HoaChat) // Include HoaChat nếu cần
//                    .Include(d => d.BaiThiNghiem) // Include BaiThiNghiem nếu cần
//                    .Select(d => new
//                    {
//                        d.MaHoaChat,
//                        d.MaBaiTN,
//                        d.SoLuong,
//                        HoaChat = d.HoaChat.TenHoaChat, // Lấy tên HoaChat
//                        BaiThiNghiem = d.BaiThiNghiem.TenBaiTN // Lấy tên BaiThiNghiem
//                    })
//                    .ToListAsync();

//                return Ok(duTruList);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
//            }
//        }// GET api/du-tru
//        [HttpGet]
//        public async Task<ActionResult> GetAllDuTru()
//        {
//            try
//            {
//                var duTruList = await _context.DuTru
//                    .Include(d => d.HoaChat)  // Include HoaChat nếu cần
//                    .Include(d => d.BaiThiNghiem)  // Include BaiThiNghiem để lấy thông tin bài thí nghiệm
//                    .ThenInclude(b => b.MonHoc)  // Include MonHoc để lấy thông tin môn học
//                    .Select(d => new
//                    {
//                        d.MaHoaChat,
//                        d.MaBaiTN,
//                        d.SoLuong,
//                        HoaChat = d.HoaChat.TenHoaChat,  // Lấy tên HoaChat
//                        BaiThiNghiem = d.BaiThiNghiem.TenBaiTN,  // Lấy tên BaiThiNghiem
//                        MonHoc = d.BaiThiNghiem.MonHoc.TenMon  // Lấy tên MonHoc từ bài thí nghiệm
//                    })
//                    .ToListAsync();

//                return Ok(duTruList);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
//            }
//        }

//        // GET api/du-tru/{maBaiTN}
//        [HttpGet("{maBaiTN}")]
//        public async Task<ActionResult> GetDuTruByBaiTN(int maBaiTN)
//        {
//            try
//            {
//                var duTru = await _context.DuTru
//                    .Where(d => d.MaBaiTN == maBaiTN)
//                    .Include(d => d.HoaChat)
//                    .Include(d => d.BaiThiNghiem) // Include BaiThiNghiem
//                    .ThenInclude(b => b.MonHoc) // Include MonHoc để lấy thông tin môn học
//                    .Select(d => new
//                    {
//                        d.MaHoaChat,
//                        d.MaBaiTN,
//                        d.SoLuong,
//                        HoaChat = d.HoaChat.TenHoaChat,
//                        BaiThiNghiem = d.BaiThiNghiem.TenBaiTN,
//                        MonHoc = d.BaiThiNghiem.MonHoc.TenMon // Lấy tên MonHoc
//                    })
//                    .ToListAsync();

//                if (duTru == null || !duTru.Any())
//                {
//                    return NotFound($"Không tìm thấy dự trù cho bài thí nghiệm với mã {maBaiTN}");
//                }

//                return Ok(duTru);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
//            }
//        }


//        //// GET api/du-tru/{maBaiTN}
//        //[HttpGet("{maBaiTN}")]
//        //public async Task<ActionResult> GetDuTruByBaiTN(int maBaiTN)
//        //{
//        //    try
//        //    {
//        //        var duTru = await _context.DuTru
//        //            .Where(d => d.MaBaiTN == maBaiTN)
//        //            .Include(d => d.HoaChat)
//        //            .Include(d => d.BaiThiNghiem)
//        //            .ToListAsync();

//        //        if (duTru == null || !duTru.Any())
//        //        {
//        //            return NotFound($"Không tìm thấy dự trù cho bài thí nghiệm với mã {maBaiTN}");
//        //        }

//        //        return Ok(duTru);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
//        //    }
//        //}

//        // PUT api/du-tru/update
//        [HttpPut("update-du-tru")]
//        public async Task<ActionResult> UpdateDuTru([FromBody] CreateDuTruRequest request)
//        {
//            if (request == null || !request.DuTruHoaChatList.Any())
//            {
//                return BadRequest("Thông tin yêu cầu không hợp lệ.");
//            }

//            try
//            {
//                foreach (var duTru in request.DuTruHoaChatList)
//                {
//                    var existingDuTru = await _context.DuTru
//                        .FirstOrDefaultAsync(d => d.MaHoaChat == duTru.MaHoaChat && d.MaBaiTN == duTru.MaBaiTN);

//                    if (existingDuTru != null)
//                    {
//                        existingDuTru.SoLuong = duTru.SoLuong; // Cập nhật số lượng
//                        _context.DuTru.Update(existingDuTru);
//                    }
//                    else
//                    {
//                        return NotFound($"Không tìm thấy dự trù cho hóa chất {duTru.MaHoaChat} và bài thí nghiệm {duTru.MaBaiTN}");
//                    }
//                }

//                await _context.SaveChangesAsync();

//                return Ok(new { Message = "Cập nhật dự trù hóa chất cho bài thí nghiệm thành công." });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình cập nhật dự trù: " + ex.Message);
//            }
//        }

//        // DELETE api/du-tru/delete/{maHoaChat}/{maBaiTN}
//        [HttpDelete("delete/{maHoaChat}/{maBaiTN}")]
//        public async Task<ActionResult> DeleteDuTru(int maHoaChat, int maBaiTN)
//        {
//            try
//            {
//                var duTru = await _context.DuTru
//                    .FirstOrDefaultAsync(d => d.MaHoaChat == maHoaChat && d.MaBaiTN == maBaiTN);

//                if (duTru == null)
//                {
//                    return NotFound("Không tìm thấy dự trù để xóa.");
//                }

//                _context.DuTru.Remove(duTru);
//                await _context.SaveChangesAsync();

//                return Ok(new { Message = "Đã xóa dự trù hóa chất thành công." });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, "Lỗi trong quá trình xóa dự trù: " + ex.Message);
//            }
//        }
//    }
//}
