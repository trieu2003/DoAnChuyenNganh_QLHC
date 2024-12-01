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
                lhp.SiSo
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

    }
}
