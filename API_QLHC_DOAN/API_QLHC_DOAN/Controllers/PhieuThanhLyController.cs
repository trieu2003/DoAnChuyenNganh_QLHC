﻿using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Models;
//using API_QLHC_DOAN.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_QLHC_DOAN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhieuThanhLyController : ControllerBase
    {
        private readonly YourDbContext _context;
        //private readonly PhieuThanhLyService _service;
        //PhieuThanhLyService service _service = service;

        // Kết hợp cả hai constructor thành một
        public PhieuThanhLyController(YourDbContext context )
        {
            _context = context;
           
        }

        // //Lấy tất cả phiếu thanh lý chi tiết với các thông tin liên quan
        [HttpGet]

        //public async Task<ActionResult<IEnumerable<PhieuThanhLyDetails>>> GetPhieuThanhLyDetails()
        //{
        //    try
        //    {
        //        // Gọi phương thức từ DbContext để lấy dữ liệu từ thủ tục
        //        var result = await _context.GetPhieuThanhLyDetailsAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error: " + ex.Message);
        //    }
        //}

        public async Task<ActionResult<IEnumerable<PhieuThanhLyDetails>>> GetPhieuThanhLyDetails()
        {
            try
            {
                // Gọi phương thức từ DbContext để lấy tất cả dữ liệu chi tiết phiếu thanh lý
                var result = await _context.GetPhieuThanhLyDetailsAsync();

                // Kiểm tra nếu result là null hoặc không có dữ liệu
                if (result == null || !result.Any())
                {
                    return NotFound("Không có dữ liệu phiếu thanh lý.");
                }

                // Nhóm kết quả theo maPhieuTL và gộp lại các chi tiết
                var groupedResult = result
                    .GroupBy(phieu => phieu.MaPhieuTL)
                    .Select(group => new PhieuThanhLyDetails
                    {
                        MaPhieuTL = group.Key, // Mã phiếu thanh lý
                        LyDo = group.First().LyDo, // Giả sử lý do giống nhau cho tất cả các chi tiết cùng maPhieuTL
                        TrangThai = group.First().TrangThai, // Trạng thái cũng có thể giống nhau cho toàn bộ phiếu
                        PhuongThucThanhLy = group.First().PhuongThucThanhLy, // Tương tự cho phương thức thanh lý
                        NgayTao = group.First().NgayTao, // Ngày tạo có thể giống nhau
                                                         //    DanhSachHoaChat = group.Select(phieu => new HoaChat
                                                         //    {
                                                         //        MaLo = phieu.MaLo,
                                                         //        NhaCungCap = phieu.NhaCungCap,
                                                         //        LoTrangThai = phieu.LoTrangThai,
                                                         //        TenHoaChat = phieu.TenHoaChat,
                                                         //        HoaChatSoLo = phieu.HoaChatSoLo,
                                                         //        HoaChatSoCAS = phieu.HoaChatSoCAS,
                                                         //        HanSuDung = phieu.HanSuDung
                                                         //    }).ToList() // Gộp các chi tiết hoa chất trong phiếu thanh lý
                                                         //})
                    })
                    .ToList();

                return Ok(groupedResult); // Trả về kết quả đã gộp
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // API để lấy chi tiết phiếu thanh lý
        [HttpGet("{maPhieuTL}")]
        public async Task<ActionResult<IEnumerable<PhieuThanhLyDetails>>> GetPhieuThanhLyDetailsAsyncChiTiet(int maPhieuTL)
        {
            try
            {
                // Gọi phương thức trong DbContext để lấy dữ liệu từ stored procedure
                var result = await _context.GetPhieuThanhLyDetailsAsyncChiTiet(maPhieuTL);

                // Kiểm tra nếu không có dữ liệu trả về
                if (result == null || !result.Any()) // Sử dụng .Any() để kiểm tra danh sách có rỗng không
                {
                    return NotFound(new { message = $"Không tìm thấy dữ liệu cho phiếu thanh lý với mã {maPhieuTL}" });
                }

                // Trả về kết quả nếu có dữ liệu
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log lỗi nếu có và trả về thông báo lỗi chung cho người dùng
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi xử lý yêu cầu.", error = ex.Message });
            }
        }


        //public async Task<List<PhieuThanhLyDetails>> GetPhieuThanhLyDetailsAsync()
        //{
        //    try
        //    {
        //        // Truy vấn dữ liệu từ cơ sở dữ liệu
        //        var result = await _context.PhieuThanhLy
        //            .Include(p => p.NguoiDung)
        //            .Include(p => p.LoHoaChats)
        //                .ThenInclude(lh => lh.HoaChat)  // Bao gồm thông tin hóa chất
        //            .Where(p => p.TrangThai != "Chờ duyệt") // Lọc phiếu thanh lý đã duyệt hoặc bị từ chối
        //            .Select(p => new PhieuThanhLyDetails
        //            {
        //                MaPhieuTL = p.MaPhieuTL,
        //                LyDo = p.LyDo,
        //                TrangThai = p.TrangThai,
        //                PhuongThucThanhLy = p.PhuongThucThanhLy,
        //                NgayTao = p.NgayTao,
        //                MaNguoiDung = p.MaNguoiDung,
        //                NguoiDung_TenDangNhap = p.NguoiDung.TenDangNhap,
        //                NguoiDung_Email = p.NguoiDung.Email,
        //                HoaChatDetails = p.LoHoaChats.Select(lh => new HoaChatDetails
        //                {
        //                    TenHoaChat = lh.HoaChat.TenHoaChat,
        //                    SoLo = lh.SoLo,
        //                    SoCAS = lh.HoaChat.SoCAS,
        //                    SoLuong = lh.SoLuong,
        //                    TrangThai = lh.TrangThai,
        //                    ThoiHanSuDung = lh.HoaChat.ThoiHanSuDung,
        //                    MoTa = lh.HoaChat.MoTa,
        //                    CongThucHoaHoc = lh.HoaChat.CongThucHoaHoc,
        //                    NguyHiem = lh.HoaChat.NguyHiem,
        //                    SoLieuAnToan = lh.HoaChat.SoLieuAnToan
        //                }).ToList()
        //            })
        //            .ToListAsync();

        //        // Nếu không có kết quả
        //        if (result == null || !result.Any())
        //        {
        //            return new List<PhieuThanhLyDetails>(); // Trả về danh sách rỗng nếu không có dữ liệu
        //        }

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Xử lý lỗi nếu có
        //        throw new Exception("Lỗi trong quá trình truy vấn dữ liệu: " + ex.Message);
        //    }
        //}
        //public async Task<ActionResult<IEnumerable<PhieuThanhLyDetails>>> GetPhieuThanhLyDetails()
        //{
        //    try
        //    {
        //        // Truy vấn các phiếu thanh lý cùng với thông tin liên quan
        //        var result = await _context.PhieuThanhLy
        //            .Include(p => p.NguoiDung)  // Include người dùng
        //            .Include(p => p.LoHoaChats) // Bao gồm thông tin lô hóa chất
        //                .ThenInclude(lh => lh.HoaChat)  // Bao gồm thông tin hóa chất trong lô hóa chất
        //            .Where(p => p.TrangThai != "Chờ duyệt")  // Lọc phiếu thanh lý đã duyệt hoặc bị từ chối
        //            .Select(p => new PhieuThanhLyDetails
        //            {
        //                MaPhieuTL = p.MaPhieuTL,
        //                LyDo = p.LyDo,
        //                TrangThai = p.TrangThai,
        //                PhuongThucThanhLy = p.PhuongThucThanhLy,
        //                NgayTao = p.NgayTao,
        //                MaNguoiDung = p.MaNguoiDung,
        //                //NguoiDung_TenDangNhap = p.NguoiDung.TenDangNhap,
        //                //NguoiDung_Email = p.NguoiDung.Email,
        //                HoaChatDetails = p.LoHoaChats.Select(lh => new HoaChatDetails
        //                {
        //                    TenHoaChat = lh.HoaChat.TenHoaChat,
        //                    SoLo = lh.SoLo,
        //                    SoCAS = lh.HoaChat.SoCAS,
        //                    SoLuong = lh.SoLuong,
        //                    TrangThai = lh.TrangThai,
        //                    //ThoiHanSuDung = lh.HoaChat.ThoiHanSuDung,
        //                    MoTa = lh.HoaChat.MoTa
        //                }).ToList()
        //            })
        //            .ToListAsync();

        //        // Nếu không tìm thấy dữ liệu
        //        if (result == null || !result.Any())
        //        {
        //            return NotFound("Không có phiếu thanh lý nào trong hệ thống.");
        //        }

        //        // Trả về kết quả
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
        //    }
        //}


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<PhieuThanhLyDetails>>> GetPhieuThanhLyDetails()
        //{
        //    try
        //    {
        //        // Truy vấn các phiếu thanh lý cùng với thông tin liên quan
        //        var result = await _context.PhieuThanhLy
        //            .Include(p => p.NguoiDung)  // Include người dùng
        //            .Include(p => p.LoHoaChats) // Bao gồm thông tin lô hóa chất
        //                .ThenInclude(lh => lh.HoaChat)  // Bao gồm thông tin hóa chất trong lô hóa chất
        //            .Where(p => p.TrangThai != "Chờ duyệt")  // Lọc phiếu thanh lý đã duyệt hoặc bị từ chối
        //            .Select(p => new PhieuThanhLyDetails
        //            {
        //                MaPhieuTL = p.MaPhieuTL,
        //                LyDo = p.LyDo,
        //                TrangThai = p.TrangThai,
        //                PhuongThucThanhLy = p.PhuongThucThanhLy,
        //                NgayTao = p.NgayTao,  // Không cần `GetValueOrDefault` nữa vì đã là non-nullable DateTime
        //                NguoiDung_TenDangNhap = p.NguoiDung.TenDangNhap,
        //                NguoiDung_Email = p.NguoiDung.Email,
        //                HoaChatDetails = p.LoHoaChats.Select(lh => new HoaChatDetails
        //                {
        //                    TenHoaChat = lh.HoaChat.TenHoaChat,
        //                    SoLo = lh.SoLo,
        //                    SoCAS = lh.HoaChat.SoCAS,
        //                    SoLuong = lh.SoLuong,
        //                    TrangThai = lh.TrangThai,
        //                    ThoiHanSuDung = lh.HoaChat.ThoiHanSuDung ?? DateTime.MinValue, // Nếu null, bạn có thể gán giá trị mặc định
        //                    MoTa = lh.HoaChat.MoTa
        //                }).ToList()
        //            })
        //            .ToListAsync();

        //        // Nếu không tìm thấy dữ liệu
        //        if (result == null || !result.Any())
        //        {
        //            return NotFound("Không có phiếu thanh lý nào trong hệ thống.");
        //        }

        //        // Trả về kết quả
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Lỗi trong quá trình lấy dữ liệu: " + ex.Message);
        //    }
        //}



        [HttpPut("accept/{id}")]
        public async Task<IActionResult> AcceptPhieuThanhLy(int id)
        {
            var phieuThanhLy = await _context.PhieuThanhLy.FindAsync(id);
            if (phieuThanhLy == null)
            {
                return NotFound("Phiếu thanh lý không tồn tại");
            }

            phieuThanhLy.TrangThai = "Đã duyệt thanh lý";

            // Cập nhật trạng thái các lô hóa chất thành 'Đã thanh lý'
            var loHoaChats = await _context.LoHoaChat.Where(lh => lh.MaPhieuTL == id).ToListAsync();
            foreach (var loHoaChat in loHoaChats)
            {
                loHoaChat.TrangThai = "Đã thanh lý";
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Phiếu thanh lý đã được duyệt và trạng thái lô hóa chất đã được cập nhật thành 'Đã thanh lý'.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình cập nhật: " + ex.Message);
            }
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectPhieuThanhLy(int id)
        {
            var phieuThanhLy = await _context.PhieuThanhLy.FindAsync(id);
            if (phieuThanhLy == null)
            {
                return NotFound("Phiếu thanh lý không tồn tại");
            }

            phieuThanhLy.TrangThai = "Đã từ chối thanh lý";

            // Cập nhật trạng thái các lô hóa chất thành 'Đang sử dụng'
            var loHoaChats = await _context.LoHoaChat.Where(lh => lh.MaPhieuTL == id).ToListAsync();
            foreach (var loHoaChat in loHoaChats)
            {
                loHoaChat.TrangThai = "Đang sử dụng";
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Phiếu thanh lý đã bị từ chối và trạng thái lô hóa chất đã được cập nhật thành 'Đang sử dụng'.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình cập nhật: " + ex.Message);
            }
        }

        
        [HttpGet("hoa-chat")]
        public async Task<ActionResult<IEnumerable<HoaChat>>> GetHoaChats()
        {
            try
            {
                // Lấy tất cả các hóa chất từ cơ sở dữ liệu
                var hoaChats = await _context.HoaChat.ToListAsync();

                // Nếu không có hóa chất nào
                if (hoaChats == null || hoaChats.Count == 0)
                {
                    return NotFound("Không có hóa chất nào trong hệ thống.");
                }

                // Nếu có dữ liệu, trả về danh sách hóa chất
                return Ok(hoaChats);
            }
            catch (Exception ex)
            {
                // Trả về lỗi nếu có sự cố trong quá trình truy vấn dữ liệu
                return StatusCode(500, "Lỗi trong quá trình lấy danh sách hóa chất: " + ex.Message);
            }
        }
        // API Lấy các hóa chất chưa thanh lý và không phải trong trạng thái "Chờ duyệt"


        [HttpGet("hoa-chat-chua-thanh-ly")]
        public async Task<ActionResult<IEnumerable<HoaChatDto>>> GetHoaChatsChuaThanhLy()
        {
            try
            {
                // Lấy tất cả các lô hóa chất có trạng thái "Đang sử dụng" và chưa thanh lý
                var hoaChats = await _context.LoHoaChat
                    .Where(lh => lh.TrangThai == "Đang sử dụng")  // Lọc các lô hóa chất đang sử dụng
                    .Include(lh => lh.HoaChat)  // Bao gồm thông tin hóa chất liên quan đến lô hóa chất
                    .Where(lh => lh.MaPhieuTL == null)  // Lọc các lô hóa chất chưa thanh lý
                    .Select(lh => new HoaChatDto
                    {
                        MaHoaChat = lh.HoaChat.MaHoaChat,
                        SoLo = lh.SoLo,  // Lấy số lô từ bảng LoHoaChat
                        SoLuong = lh.SoLuong,  // Số lượng từ bảng LoHoaChat
                        SoCAS = lh.HoaChat.SoCAS, // Lấy số CAS từ bảng HoaChat
                        TenHoaChat = lh.HoaChat.TenHoaChat,  // Tên hóa chất từ bảng HoaChat
                        DonVi = lh.HoaChat.DonVi,  // Đơn vị từ bảng HoaChat
                        MoTa = lh.HoaChat.MoTa,  // Mô tả từ bảng HoaChat
                        CongThucHoaHoc = lh.HoaChat.CongThucHoaHoc,  // Công thức hóa học từ bảng HoaChat
                        NguyHiem = lh.HoaChat.NguyHiem,  // Nguy hiểm từ bảng HoaChat
                        SoLieuAnToan = lh.HoaChat.SoLieuAnToan,  // Số liệu an toàn từ bảng HoaChat
                        ThoiHanSuDung = lh.HoaChat.ThoiHanSuDung,  // Thời hạn sử dụng từ bảng HoaChat
                        HinhAnh = lh.HoaChat.HinhAnh,  // Hình ảnh từ bảng HoaChat
                        NgayTao = lh.HoaChat.NgayTao  // Ngày tạo từ bảng HoaChat
                    })
                    .Distinct()  // Đảm bảo không có dữ liệu trùng
                    .ToListAsync();  // Thực thi truy vấn

                // Nếu không có dữ liệu
                if (!hoaChats.Any())
                {
                    return NotFound("Không có hóa chất chưa thanh lý.");
                }

                // Trả về danh sách hóa chất chưa thanh lý
                return Ok(hoaChats);
            }
            catch (Exception ex)
            {
                // Trả về lỗi nếu có sự cố trong quá trình truy vấn dữ liệu
                return StatusCode(500, "Lỗi trong quá trình lấy danh sách hóa chất chưa thanh lý: " + ex.Message);
            }
        }

        // API Lấy hóa chất theo Số CAS (Dành cho tìm kiếm)
        [HttpGet("hoa-chat/{soCAS}")]
        public async Task<ActionResult<HoaChatDto>> GetHoaChatByCAS(string soCAS)
        {
            try
            {
                var hoaChat = await _context.HoaChat
                    .Where(h => h.SoCAS == soCAS)
                    .FirstOrDefaultAsync();

                if (hoaChat == null)
                {
                    return NotFound("Hóa chất không tồn tại");
                }

                var hoaChatDto = new HoaChatDto
                {
                    MaHoaChat = hoaChat.MaHoaChat,
                    SoCAS = hoaChat.SoCAS,
                    TenHoaChat = hoaChat.TenHoaChat,
                    DonVi = hoaChat.DonVi,
                    MoTa = hoaChat.MoTa,
                    CongThucHoaHoc = hoaChat.CongThucHoaHoc,
                    NguyHiem = hoaChat.NguyHiem,
                    SoLieuAnToan = hoaChat.SoLieuAnToan,
                    ThoiHanSuDung = hoaChat.ThoiHanSuDung,
                    HinhAnh = hoaChat.HinhAnh,
                    NgayTao = hoaChat.NgayTao
                };

                return Ok(hoaChatDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

   

        [HttpGet("hoa-chat-lo-hoa-chat/{maHoaChat}")]
        public async Task<ActionResult<HoaChatDto>> GetHoaChatInLoHoaChatByMaHoaChat(int maHoaChat)
        {
            try
            {
                // Lấy tất cả các lô hóa chất liên quan đến mã hóa chất
                var loHoaChats = await _context.LoHoaChat
                    .Include(lh => lh.HoaChat)  // Bao gồm dữ liệu hóa chất liên quan
                    .Where(lh => lh.MaHoaChat == maHoaChat)  // Lọc theo mã hóa chất
                    .ToListAsync();  // Lấy tất cả các lô hóa chất

                if (loHoaChats == null || !loHoaChats.Any())
                {
                    return NotFound("Không có lô hóa chất nào liên quan đến mã hóa chất này.");
                }

                // Chọn một lô hóa chất từ danh sách nếu cần hoặc truy vấn theo yêu cầu
                var loHoaChat = loHoaChats.First();  // Lấy lô hóa chất đầu tiên (hoặc logic khác để chọn lô hóa chất)

                // Lấy thông tin hóa chất từ lô hóa chất
                var hoaChat = loHoaChat.HoaChat;

                if (hoaChat == null)
                {
                    return NotFound("Không tìm thấy thông tin hóa chất cho lô hóa chất này.");
                }

                var hoaChatDto = new HoaChatDto
                {
                    MaHoaChat = hoaChat.MaHoaChat,
                    SoCAS = hoaChat.SoCAS,
                    TenHoaChat = hoaChat.TenHoaChat,
                    DonVi = hoaChat.DonVi,
                    MoTa = hoaChat.MoTa,
                    CongThucHoaHoc = hoaChat.CongThucHoaHoc,
                    NguyHiem = hoaChat.NguyHiem,
                    SoLieuAnToan = hoaChat.SoLieuAnToan,
                    ThoiHanSuDung = hoaChat.ThoiHanSuDung,
                    HinhAnh = hoaChat.HinhAnh,
                    NgayTao = hoaChat.NgayTao
                };

                return Ok(hoaChatDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [HttpGet("hoa-chat-lo-hoa-chat-ten/{TenHoaChat}")]
        public async Task<ActionResult<HoaChatDto>> GetHoaChatInLoHoaChatByMaHoaChatTenHoaChat(string TenHoaChat)
        {
            try
            {
                // Lấy tất cả các lô hóa chất liên quan đến mã hóa chất
                var loHoaChats = await _context.LoHoaChat
                    .Include(lh => lh.HoaChat)  // Bao gồm dữ liệu hóa chất liên quan
                    .Where(lh => lh.HoaChat.TenHoaChat == TenHoaChat)  // Lọc theo mã hóa chất
                    .ToListAsync();  // Lấy tất cả các lô hóa chất

                if (loHoaChats == null || !loHoaChats.Any())
                {
                    return NotFound("Không có lô hóa chất nào liên quan đến mã hóa chất này.");
                }

                // Chọn một lô hóa chất từ danh sách nếu cần hoặc truy vấn theo yêu cầu
                var loHoaChat = loHoaChats.First();  // Lấy lô hóa chất đầu tiên (hoặc logic khác để chọn lô hóa chất)

                // Lấy thông tin hóa chất từ lô hóa chất
                var hoaChat = loHoaChat.HoaChat;

                if (hoaChat == null)
                {
                    return NotFound("Không tìm thấy thông tin hóa chất cho lô hóa chất này.");
                }

                var hoaChatDto = new HoaChatDto
                {

                    MaHoaChat = hoaChat.MaHoaChat,
                    SoCAS = hoaChat.SoCAS,
                    TenHoaChat = hoaChat.TenHoaChat,
                    DonVi = hoaChat.DonVi,
                    MoTa = hoaChat.MoTa,
                    CongThucHoaHoc = hoaChat.CongThucHoaHoc,
                    NguyHiem = hoaChat.NguyHiem,
                    SoLieuAnToan = hoaChat.SoLieuAnToan,
                    ThoiHanSuDung = hoaChat.ThoiHanSuDung,
                    HinhAnh = hoaChat.HinhAnh,
                    NgayTao = hoaChat.NgayTao
                };

                return Ok(hoaChatDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("create-phieu-thanh-ly")]
        public async Task<ActionResult> CreatePhieuThanhLy([FromBody] CreatePhieuThanhLyRequest request)
        {
            if (request == null || request.PhieuThanhLy == null || !request.SoLoList.Any())
            {
                return BadRequest("Thông tin yêu cầu không hợp lệ.");
            }

            try
            {
                // Kiểm tra xem các số lô được cung cấp có hợp lệ không
                var loHoaChats = await _context.LoHoaChat
                    .Where(lh => request.SoLoList.Contains(lh.SoLo) && lh.MaPhieuTL == null) // Lọc các lô chưa được thanh lý
                    .ToListAsync();

                if (!loHoaChats.Any())
                {
                    return BadRequest("Không có số lô nào hợp lệ để thanh lý.");
                }

                // Tạo phiếu thanh lý
                var phieuThanhLy = new PhieuThanhLy
                {
                    LyDo = request.PhieuThanhLy.LyDo,
                    PhuongThucThanhLy = request.PhieuThanhLy.PhuongThucThanhLy,
                    NgayTao = DateTime.UtcNow,
                    MaNguoiDung = request.PhieuThanhLy.MaNguoiDung,
                    TrangThai = "Chờ duyệt" // Mặc định trạng thái là "Chờ duyệt"
                };

                _context.PhieuThanhLy.Add(phieuThanhLy);
                await _context.SaveChangesAsync();

                // Liên kết các số lô với phiếu thanh lý
                foreach (var loHoaChat in loHoaChats)
                {
                    loHoaChat.MaPhieuTL = phieuThanhLy.MaPhieuTL; // Liên kết lô hóa chất với phiếu thanh lý
                    loHoaChat.TrangThai = "Đang thanh lý"; // Cập nhật trạng thái của lô hóa chất
                }

                // Lưu tất cả các thay đổi
                await _context.SaveChangesAsync();

                // Trả về thông tin phiếu thanh lý vừa tạo
                var phieuThanhLyDto = new
                {
                    phieuThanhLy.MaPhieuTL,
                    phieuThanhLy.LyDo,
                    phieuThanhLy.PhuongThucThanhLy,
                    phieuThanhLy.TrangThai,
                    phieuThanhLy.NgayTao,
                    SoLoList = request.SoLoList
                };

                return Ok(phieuThanhLyDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình tạo phiếu thanh lý: " + ex.Message);
            }
        }

        
        }

    }


