using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static API_QLHC_DOAN.Models.BaiThiNghiem;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuTruController : ControllerBase
    {
        private readonly YourDbContext _context;
        public DuTruController(YourDbContext context)
        {
            _context = context;
        }
        [HttpGet("getBaiTN/{MaBaiTN}")]
        public async Task<IActionResult> GetBaiThiNghiemById(int MaBaiTN)
        {
            try
            {
                // Lấy bài thí nghiệm từ bảng BaiThiNghiem theo id
                var baiThiNghiem = await _context.BaiThiNghiem
                    .Where(b => b.MaBaiTN == MaBaiTN)
                    .FirstOrDefaultAsync();

                if (baiThiNghiem == null)
                {
                    return NotFound(new { Message = "Bài thí nghiệm không tồn tại." });
                }

                // Lấy thông tin môn học từ bảng MonHoc dựa trên khóa ngoại MaMonHoc
                var monHoc = await _context.MonHoc
                    .Where(m => m.MaMon == baiThiNghiem.MaMon)
                    .FirstOrDefaultAsync();

                // Kết quả trả về
                var result = new
                {
                    baiThiNghiem.MaBaiTN,
                    baiThiNghiem.TenBaiTN,
                    baiThiNghiem.MaMon,
                    TenMonHoc = monHoc?.TenMon // Nếu môn học không tồn tại, trả về null
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy thông tin bài thí nghiệm.",
                    Error = ex.Message
                });
            }
        }

        // POST: api/BaiThiNghiem
        [HttpPost("taoBaiTN")]
        public async Task<IActionResult> CreateBaiThiNghiem([FromBody] BaiThiNghiem dto)
        {
            // Kiểm tra dữ liệu đầu vào
            if (string.IsNullOrWhiteSpace(dto.TenBaiTN))
            {
                return BadRequest("Tên bài thí nghiệm không được để trống.");
            }

            // Kiểm tra Mã Môn có tồn tại không
            var monHoc = await _context.MonHoc.FindAsync(dto.MaMon);
            if (monHoc == null)
            {
                return NotFound($"Không tìm thấy môn học với mã: {dto.MaMon}");
            }

            // Tạo đối tượng Bài Thí Nghiệm
            var baiThiNghiem = new BaiThiNghiem
            {
                TenBaiTN = dto.TenBaiTN,
                MaMon = dto.MaMon
            };

            // Lưu vào cơ sở dữ liệu
            _context.BaiThiNghiem.Add(baiThiNghiem);
            await _context.SaveChangesAsync();

            // Trả về kết quả
            return CreatedAtAction(nameof(CreateBaiThiNghiem), new { id = baiThiNghiem.MaBaiTN }, baiThiNghiem);
        }
        [HttpGet("detail/{maMonHoc}")]
        public async Task<IActionResult> GetBaiThiNghiemByMonHocId(int maMonHoc)
        {
            try
            {
                // Lấy danh sách các bài thí nghiệm theo MaMonHoc, kèm theo bảng Dự trù và Hoá chất
                var baiThiNghiems = await _context.BaiThiNghiem
                    .Where(b => b.MaMon == maMonHoc) // Lọc theo MaMonHoc
                    .Select(b => new
                    {
                        b.MaBaiTN,
                        b.TenBaiTN,
                        // Kết hợp với bảng Dự trù
                        DuTru = _context.DuTru
                            .Where(d => d.MaBaiTN == b.MaBaiTN)
                            .GroupBy(d => d.MaHoaChat) // Nhóm theo MaHoaChat để tính tổng lượng
                            .Select(g => new
                            {
                                MaHoaChat = g.Key,
                                SoLuong = g.Sum(d => d.SoLuong), // Tính tổng số lượng của mỗi hóa chất
                                HoaChat = _context.HoaChat
                                    .Where(h => h.MaHoaChat == g.Key)
                                    .Select(h => new
                                    {
                                        h.TenHoaChat,
                                        h.DonVi
                                    })
                                    .FirstOrDefault()
                            })
                            .ToList(),

                        // Lấy thông tin lớp học phần liên quan
                        LopHocPhan = _context.LopHocPhan
                            .Where(lhp => lhp.MaMon == maMonHoc)
                            .Select(l => new
                            {
                                l.MaLHP,
                                l.GVDay,
                                l.SiSo
                            })
                            .ToList()
                    })
                    .ToListAsync(); // Lấy tất cả bài thí nghiệm

                if (baiThiNghiems == null || baiThiNghiems.Count == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy bài thí nghiệm cho môn học này." });
                }

                return Ok(baiThiNghiems);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách bài thí nghiệm.",
                    Error = ex.Message
                });
            }
        }
        [HttpGet("thongkeTongSL/{maMonHoc}")]
        public async Task<IActionResult> ThongKeHoaChatTheoMonHoc(int maMonHoc)
        {
            try
            {
                // Lấy tất cả các bài thí nghiệm thuộc môn học
                var baiThiNghiems = await _context.BaiThiNghiem
                    .Where(b => b.MaMon == maMonHoc)
                    .Select(b => b.MaBaiTN)
                    .ToListAsync();

                if (baiThiNghiems == null || baiThiNghiems.Count == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy bài thí nghiệm cho môn học này." });
                }

                // Lấy danh sách Dự trù thuộc các bài thí nghiệm
                var duTrus = await _context.DuTru
                    .Where(d => baiThiNghiems.Contains(d.MaBaiTN))
                    .GroupBy(d => d.MaHoaChat)
                    .Select(g => new
                    {
                        MaHoaChat = g.Key,
                        TongSoLuong = g.Sum(d => d.SoLuong), // Tổng số lượng
                        HoaChat = _context.HoaChat
                            .Where(h => h.MaHoaChat == g.Key)
                            .Select(h => new
                            {
                                h.TenHoaChat,
                                h.DonVi
                            })
                            .FirstOrDefault()
                    })
                    .ToListAsync();

                if (duTrus == null || duTrus.Count == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy hóa chất trong các bài thí nghiệm." });
                }

                return Ok(duTrus);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi thống kê hóa chất.",
                    Error = ex.Message
                });
            }
        }

        //[HttpGet("thongke-lhp/{maLHP}")]
        //public async Task<IActionResult> GetBaiThiNghiemByLopHocPhanId(int maLHP)
        //{
        //    try
        //    {
        //        // Lấy danh sách các bài thí nghiệm theo MaLHP, kèm theo bảng Dự trù và Hoá chất
        //        var baiThiNghiems = await _context.BaiThiNghiem
        //            .Where(b => b.MaLHP == maLHP) // Lọc theo MaLHP
        //            .Select(b => new
        //            {
        //                b.MaBaiTN,
        //                b.TenBaiTN,
        //                // Kết hợp với bảng Dự trù
        //                DuTru = _context.DuTru
        //                    .Where(d => d.MaBaiTN == b.MaBaiTN)
        //                    .GroupBy(d => d.MaHoaChat) // Nhóm theo MaHoaChat để tính tổng lượng
        //                    .Select(g => new
        //                    {
        //                        MaHoaChat = g.Key,
        //                        SoLuong = g.Sum(d => d.SoLuong), // Tính tổng số lượng của mỗi hóa chất
        //                        HoaChat = _context.HoaChat
        //                            .Where(h => h.MaHoaChat == g.Key)
        //                            .Select(h => new
        //                            {
        //                                h.TenHoaChat,
        //                                h.DonVi
        //                            })
        //                            .FirstOrDefault()
        //                    })
        //                    .ToList(),

        //                // Lấy thông tin lớp học phần liên quan
        //                LopHocPhan = _context.LopHocPhan
        //                    .Where(lhp => lhp.MaLHP == maLHP)
        //                    .Select(l => new
        //                    {
        //                        l.MaLHP,
        //                        l.GVDay,
        //                        l.SiSo
        //                    })
        //                    .FirstOrDefault() // Mỗi lớp học phần chỉ có một thông tin lớp
        //            })
        //            .ToListAsync(); // Lấy tất cả bài thí nghiệm

        //        if (baiThiNghiems == null || baiThiNghiems.Count == 0)
        //        {
        //            return NotFound(new { Message = "Không tìm thấy bài thí nghiệm cho lớp học phần này." });
        //        }

        //        return Ok(baiThiNghiems);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, new
        //        {
        //            Message = "Có lỗi xảy ra khi lấy danh sách bài thí nghiệm.",
        //            Error = ex.Message
        //        });
        //    }
        //}
        [HttpGet("monhoc")]
        public async Task<IActionResult> GetMonHocList()
        {
            try
            {
                var monHocs = await _context.MonHoc
                    .Select(m => new
                    {
                        m.MaMon,
                        m.TenMon,
                        m.SoTC

                    })
                    .ToListAsync();

                if (monHocs == null || monHocs.Count == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy môn học." });
                }

                return Ok(monHocs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách môn học.",
                    Error = ex.Message
                });
            }
        }
        [HttpGet("lophocphan")]
        public async Task<IActionResult> GetLopHocPhanList()
        {
            try
            {
                var lopHocPhans = await _context.LopHocPhan
                    .Select(l => new
                    {
                        l.MaLHP,
                        l.MaMon,
                        l.GVDay,
                        l.SiSo
                    })
                    .ToListAsync();

                if (lopHocPhans == null || lopHocPhans.Count == 0)
                {
                    return NotFound(new { Message = "Không tìm thấy lớp học phần." });
                }

                return Ok(lopHocPhans);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy danh sách lớp học phần.",
                    Error = ex.Message
                });
            }
        }

        [HttpGet("lophocphan/{maMon}")]
        public async Task<IActionResult> GetLopHocPhanByMaMon(int maMon)
        {
            try
            {
                var lopHocPhans = await _context.LopHocPhan
                    .Where(l => l.MaMon == maMon)
                    .Select(l => new
                    {
                        l.MaLHP,
                        l.MaMon,
                        l.GVDay,
                        l.SiSo
                    })
                    .ToListAsync();

                return Ok(lopHocPhans);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi lấy lớp học phần.",
                    Error = ex.Message
                });
            }
        }
        [HttpPost("taoDuTru")]
        public async Task<IActionResult> CreateDuTru([FromBody] DuTru dto)
        {
            try
            {
                var duTru = new DuTru
                {
                    MaHoaChat = dto.MaHoaChat,
                    MaBaiTN = dto.MaBaiTN,
                    SoLuong = dto.SoLuong
                };

                _context.DuTru.Add(duTru);
                await _context.SaveChangesAsync();

                return Ok(duTru);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "Có lỗi xảy ra khi tạo dự trù.",
                    Error = ex.Message
                });
            }
        }


    }
}
