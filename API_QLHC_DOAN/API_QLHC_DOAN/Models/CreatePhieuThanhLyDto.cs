namespace API_QLHC_DOAN.Models
{
    public class CreatePhieuThanhLyDto
    {
        public string LyDo { get; set; }
        public string PhuongThucThanhLy { get; set; }
        public int MaNguoiDung { get; set; }
        public List<int> MaHoaChatList { get; set; }  // Danh sách mã hóa chất
    }
}
