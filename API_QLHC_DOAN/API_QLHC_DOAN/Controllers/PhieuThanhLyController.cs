using API_QLHC_DOAN.Data;
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
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectPhieuThanhLy(int id, [FromBody] string lyDoTuChoi)
        {
            if (string.IsNullOrEmpty(lyDoTuChoi))
            {
                return BadRequest("Lý do từ chối không thể bỏ trống.");
            }

            try
            {
                // Tìm phiếu thanh lý
                var phieuThanhLy = await _context.PhieuThanhLy.FindAsync(id);
                if (phieuThanhLy == null)
                {
                    return NotFound("Phiếu thanh lý không tồn tại.");
                }

                // Cập nhật trạng thái phiếu thanh lý thành 'Đã từ chối' (cho phép từ chối nhiều lần)
                phieuThanhLy.TrangThai = "Đã từ chối";

                // Cập nhật trạng thái các lô hóa chất nhưng giữ mã phiếu thanh lý
                var loHoaChats = await _context.LoHoaChat.Where(lh => lh.MaPhieuTL == id).ToListAsync();
                foreach (var loHoaChat in loHoaChats)
                {
                    loHoaChat.TrangThai = "Đang sử dụng"; // Trạng thái lô hóa chất sau khi từ chối
                }

                // Lưu vết vào bảng DuyetPhieuTL mỗi lần từ chối
                var duyetPhieuLichSu = new DuyetPhieuTL
                {
                    MaPhieuTL = id,
                    MaNguoiDung = phieuThanhLy.MaNguoiDung,
                    NgayDuyet = DateTime.Now,
                    TrangThai = "Đã từ chối",
                    LyDoTuChoi = lyDoTuChoi
                };
                _context.DuyetPhieuTL.Add(duyetPhieuLichSu);

                // Lưu thay đổi
                await _context.SaveChangesAsync();

                return Ok("Phiếu thanh lý đã bị từ chối và lưu vết vào hệ thống.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình cập nhật và lưu vết: " + ex.Message);
            }
        }




        [HttpPut("accept/{id}")]
        public async Task<IActionResult> AcceptPhieuThanhLy(int id)
        {
            try
            {
                // Tìm phiếu thanh lý
                var phieuThanhLy = await _context.PhieuThanhLy.FindAsync(id);
                if (phieuThanhLy == null)
                {
                    return NotFound("Phiếu thanh lý không tồn tại.");
                }

                // Cập nhật trạng thái phiếu thanh lý
                phieuThanhLy.TrangThai = "Đã duyệt thanh lý";

                // Cập nhật trạng thái các lô hóa chất thành 'Đã thanh lý'
                var loHoaChats = await _context.LoHoaChat.Where(lh => lh.MaPhieuTL == id).ToListAsync();
                foreach (var loHoaChat in loHoaChats)
                {
                    loHoaChat.TrangThai = "Đã thanh lý";
                }

                // Lưu vết vào bảng DuyetPhieuTL
                var duyetPhieu = new DuyetPhieuTL
                {
                    MaPhieuTL = id,
                    MaNguoiDung = phieuThanhLy.MaNguoiDung, // Gán MaNguoiDung từ phiếu thanh lý
                    NgayDuyet = DateTime.Now,
                    TrangThai = "Đã duyệt",
                    LyDoTuChoi = null // Không có lý do từ chối
                };
                _context.DuyetPhieuTL.Add(duyetPhieu);

                await _context.SaveChangesAsync();
                return Ok("Phiếu thanh lý đã được duyệt và trạng thái lô hóa chất đã được cập nhật thành 'Đã thanh lý'.");
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
                    //.Where(lh => lh.MaPhieuTL == null)  // Lọc các lô hóa chất chưa thanh lý
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
                // Lấy danh sách các lô hóa chất cần thanh lý
                var loHoaChats = await _context.LoHoaChat
                    .Where(lh => request.SoLoList.Contains(lh.SoLo))  // Lọc các lô hóa chất theo số lô
                    .ToListAsync();

                // Lấy phiếu thanh lý cũ nếu có lô hóa chất đã có phiếu thanh lý
                foreach (var loHoaChat in loHoaChats)
                {
                    if (loHoaChat.MaPhieuTL != null)
                    {
                        // Trường hợp tái thanh lý: Nếu phiếu thanh lý đã bị từ chối
                        var phieuThanhLyCuaLo = await _context.PhieuThanhLy
                            .Where(ptl => ptl.MaPhieuTL == loHoaChat.MaPhieuTL)
                            .FirstOrDefaultAsync();

                        if (phieuThanhLyCuaLo != null)
                        {
                            var duyetPhieu = await _context.DuyetPhieuTL
                                .Where(d => d.MaPhieuTL == phieuThanhLyCuaLo.MaPhieuTL && d.TrangThai == "Đã từ chối")
                                .FirstOrDefaultAsync();

                            if (duyetPhieu != null)
                            {
                                // Cập nhật trạng thái phiếu thanh lý và các lô hóa chất khi tái thanh lý
                                phieuThanhLyCuaLo.TrangThai = "Chờ duyệt"; // Cập nhật trạng thái phiếu thanh lý
                                loHoaChat.TrangThai = "Đang thanh lý"; // Cập nhật trạng thái lô hóa chất
                            }
                            else
                            {
                                return BadRequest($"Lô hóa chất {loHoaChat.SoLo} không thể tái thanh lý vì phiếu thanh lý đã được duyệt thành công.");
                            }
                        }
                    }
                    else if (loHoaChat.MaPhieuTL == null && loHoaChat.TrangThai == "Đang sử dụng")
                    {
                        // Trường hợp tạo phiếu thanh lý mới cho lô hóa chất chưa có phiếu thanh lý
                        var phieuThanhLyMoi = new PhieuThanhLy
                        {
                            LyDo = request.PhieuThanhLy.LyDo,
                            PhuongThucThanhLy = request.PhieuThanhLy.PhuongThucThanhLy,
                            NgayTao = DateTime.UtcNow,
                            MaNguoiDung = request.PhieuThanhLy.MaNguoiDung,
                            TrangThai = "Chờ duyệt"
                        };

                        // Lưu phiếu thanh lý mới vào cơ sở dữ liệu
                        _context.PhieuThanhLy.Add(phieuThanhLyMoi);
                        await _context.SaveChangesAsync();  // Lưu phiếu thanh lý mới vào DB

                        // Gán mã phiếu thanh lý cho tất cả các lô hóa chất
                        foreach (var loHoaChatS in loHoaChats)
                        {
                            loHoaChatS.MaPhieuTL = phieuThanhLyMoi.MaPhieuTL;  // Liên kết lô hóa chất với phiếu thanh lý mới
                            loHoaChatS.TrangThai = "Đang thanh lý";  // Cập nhật trạng thái các lô hóa chất
                        }
                    }
                }

                // Lưu tất cả các thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                // Trả về thông tin của các lô hóa chất đã tái thanh lý hoặc đã được tạo phiếu thanh lý
                var phieuThanhLyDto = new
                {
                    SoLoList = request.SoLoList,
                    TrangThai = "Đang thanh lý",
                    ThongBao = "Các lô hóa chất đã được tái thanh lý thành công và liên kết lại với phiếu thanh lý."
                };

                return Ok(phieuThanhLyDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi trong quá trình tái thanh lý: " + ex.Message);
            }
        }


    }

}


public class RejectRequest
{
    public string LyDoTuChoi { get; set; }
    public int MaNguoiDung { get; set; }
}