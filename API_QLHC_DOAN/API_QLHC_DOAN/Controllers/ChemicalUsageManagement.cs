using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChemicalUsageManagement : ControllerBase
    {
        private readonly YourDbContext _context;

        public ChemicalUsageManagement(YourDbContext context)
        {
            _context = context;
        }
        // 1. API: Lấy danh sách các lớp học phần
        [HttpGet("GetClasses")]
        public IActionResult GetClasses()
        {
            var classes = _context.LopHocPhan.Select(lhp => new
            {
                lhp.MaLHP,
                lhp.GVDay,
                lhp.SiSo,
                lhp.TenLopHocPhan
            }).ToList();

            if (!classes.Any())
            {
                return NotFound("Không tìm thấy lớp học phần nào.");
            }

            return Ok(classes);
        }
        [HttpPost("CreatePhieuPhanBo")]
        public async Task<IActionResult> CreatePhieuPhanBo([FromBody] PhieuPhanBo phieuPhanBo)
        {
            if (phieuPhanBo == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            _context.PhieuPhanBo.Add(phieuPhanBo);
            await _context.SaveChangesAsync();

            return Ok(phieuPhanBo); // Trả về dữ liệu phiếu vừa tạo
        }

        [HttpPost("create-allocation-details")]
        public async Task<IActionResult> CreateChiTietPhanBo([FromBody] List<ChiTietPhanBo> chiTietPhanBo)
        {
            if (chiTietPhanBo == null || chiTietPhanBo.Count == 0)
            {
                return BadRequest("Thông tin chi tiết phân bổ không hợp lệ.");
            }

            // Kiểm tra xem tất cả MaPhieuPB có tồn tại không
            var maPhieuPBs = chiTietPhanBo.Select(ct => ct.MaPhieuPB).Distinct().ToList();
            var existingMaPhieuPBs = _context.PhieuPhanBo
                                            .Where(pb => maPhieuPBs.Contains(pb.MaPhieuPB))
                                            .Select(pb => pb.MaPhieuPB)
                                            .ToList();

            if (existingMaPhieuPBs.Count != maPhieuPBs.Count)
            {
                return BadRequest("Một hoặc nhiều mã phiếu phân bổ không tồn tại.");
            }

            // Kiểm tra xem tất cả MaLo có tồn tại không
            var maLos = chiTietPhanBo.Select(ct => ct.MaLo).Distinct().ToList();
            var existingMaLos = _context.LoHoaChat
                                        .Where(lo => maLos.Contains(lo.MaLo))
                                        .Select(lo => lo.MaLo)
                                        .ToList();

            if (existingMaLos.Count != maLos.Count)
            {
                return BadRequest("Một hoặc nhiều mã lô hóa chất không tồn tại.");
            }

            // Lưu ChiTietPhanBo
            _context.ChiTietPhanBo.AddRange(chiTietPhanBo);
            await _context.SaveChangesAsync();

            return Ok(chiTietPhanBo);
        }
        // 4. API: Lấy danh sách các phiếu phân bổ
        [HttpGet("GetPhieuPhanBo")]
        public IActionResult GetPhieuPhanBo()
        {
            var phieuPhanBoList = _context.PhieuPhanBo
                .Select(p => new
                {
                    p.MaPhieuPB,
                    p.NgayLap,
                    p.NoiDung,
                    p.MaLHP,
                    ChiTiet = _context.ChiTietPhanBo
                        .Where(ct => ct.MaPhieuPB == p.MaPhieuPB)
                        .Select(ct => new
                        {
                            ct.MaLo,
                            ct.SoLuong
                        })
                        .ToList() // Convert to a List to resolve the projection issue
                })
                .ToList(); // Execute the main query and materialize the results

            if (!phieuPhanBoList.Any())
            {
                return NotFound("Không tìm thấy phiếu phân bổ nào.");
            }

            return Ok(phieuPhanBoList);
        }
        [HttpGet("GetClassInfoByPhieuPhanBo/{maPhieuPB}")]
        public IActionResult GetClassInfoByPhieuPhanBo(int maPhieuPB)
        {
            var classInfo = _context.PhieuPhanBo
                .Where(p => p.MaPhieuPB == maPhieuPB)
                .Join(
                    _context.LopHocPhan,
                    phieuPhanBo => phieuPhanBo.MaLHP,
                    lopHocPhan => lopHocPhan.MaLHP,
                    (phieuPhanBo, lopHocPhan) => new
                    {
                        lopHocPhan.TenLopHocPhan,
                        lopHocPhan.GVDay,
                        lopHocPhan.SiSo
                    }
                )
                .FirstOrDefault();

            if (classInfo == null)
            {
                return NotFound($"Không tìm thấy thông tin lớp học phần cho mã phiếu phân bổ {maPhieuPB}.");
            }

            return Ok(classInfo);
        }
        [HttpPut("UpdatePhieuPhanBo/{maPhieuPB}")]
        public async Task<IActionResult> UpdatePhieuPhanBo(int maPhieuPB, [FromBody] PhieuPhanBo updatedPhieuPhanBo)
        {
            if (maPhieuPB != updatedPhieuPhanBo.MaPhieuPB)
            {
                return BadRequest("Mã phiếu phân bổ không khớp.");
            }

            var existingPhieuPhanBo = await _context.PhieuPhanBo.FindAsync(maPhieuPB);
            if (existingPhieuPhanBo == null)
            {
                return NotFound($"Không tìm thấy phiếu phân bổ với mã {maPhieuPB}.");
            }

            // Cập nhật thông tin
            existingPhieuPhanBo.NoiDung = updatedPhieuPhanBo.NoiDung;
            existingPhieuPhanBo.NgayLap = updatedPhieuPhanBo.NgayLap;
            existingPhieuPhanBo.MaLHP = updatedPhieuPhanBo.MaLHP;

            // Lưu thay đổi
            await _context.SaveChangesAsync();

            return NoContent(); // Thành công nhưng không trả về nội dung
        }
        [HttpPut("UpdateChiTietPhanBo/{maPhieuPB}/{maLo}")]
        public async Task<IActionResult> UpdateChiTietPhanBo(int maPhieuPB, int maLo, [FromBody] ChiTietPhanBo updatedChiTietPhanBo)
        {
            var existingChiTiet = await _context.ChiTietPhanBo
                .FirstOrDefaultAsync(ct => ct.MaPhieuPB == maPhieuPB && ct.MaLo == maLo);

            if (existingChiTiet == null)
            {
                return NotFound($"Không tìm thấy chi tiết phân bổ với mã phiếu {maPhieuPB} và mã lô {maLo}.");
            }

            // Cập nhật thông tin
            existingChiTiet.SoLuong = updatedChiTietPhanBo.SoLuong;

            // Lưu thay đổi
            await _context.SaveChangesAsync();

            return NoContent(); // Thành công nhưng không trả về nội dung
        }
        [HttpGet("GetMaxQuantityLotByChemicalName/{tenHoaChat}")]
        public IActionResult GetMaxQuantityLotByChemicalName(string tenHoaChat)
        {
            var result = _context.Set<MaxQuantityLotDto>()
                .FromSqlInterpolated($"EXEC GetMaxQuantityLotByChemicalName @TenHoaChat = {tenHoaChat}")
                .ToList();

            if (!result.Any())
            {
                return NotFound("No lot found for the given chemical name.");
            }

            return Ok(result.First());
        }



        [HttpGet("GetChemicalNames")]
        public IActionResult GetChemicalNames()
        {
            var names = _context.HoaChat.Select(hc => new
            {
                hc.MaHoaChat,
                hc.TenHoaChat
            }).ToList();

            return Ok(names);
        }


        [HttpGet("GetChemicalByLot/{maLo}")]
        public IActionResult GetChemicalByLot(int maLo)
        {
            try
            {
                // Truy vấn thông tin hóa chất dựa trên mã lô
                var result = _context.LoHoaChat
                    .Where(lo => lo.MaLo == maLo)
                    .Join(
                        _context.HoaChat,
                        lo => lo.MaHoaChat,
                        hc => hc.MaHoaChat,
                        (lo, hc) => new
                        {
                            lo.MaLo,
                            hc.TenHoaChat
                        }
                    )
                    .FirstOrDefault();

                if (result == null)
                {
                    return NotFound($"Không tìm thấy hóa chất cho mã lô {maLo}.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Trả về lỗi nếu có vấn đề xảy ra
                return StatusCode(500, new { message = "Đã xảy ra lỗi", error = ex.Message });
            }
        }




    }

}
