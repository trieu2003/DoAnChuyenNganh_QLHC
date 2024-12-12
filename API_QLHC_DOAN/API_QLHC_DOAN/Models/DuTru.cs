namespace API_QLHC_DOAN.Models
{
    public class DuTru
    {
        public int MaHoaChat { get; set; } // Composite Primary Key
        public int MaBaiTN { get; set; } // Composite Primary Key
        public int SoLuong { get; set; }

        //// Navigation Properties
        //public HoaChat? HoaChat { get; set; }
        //public BaiThiNghiem? BaiThiNghiem { get; set; }
    }
}
