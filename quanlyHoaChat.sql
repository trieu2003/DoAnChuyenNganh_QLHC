--DROP DATABASE QLHC_NHOM9
CREATE DATABASE QLHC_NHOM9
GO
USE QLHC_NHOM9
GO
-- Bảng Người Dùng
CREATE TABLE NguoiDung (
    MaNguoiDung INT PRIMARY KEY IDENTITY,
    TenDangNhap NVARCHAR(50) NOT NULL UNIQUE,
    MatKhauHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    VaiTro NVARCHAR(50),
    NgayTao DATE NOT NULL,
    HinhAnh NVARCHAR(255)
);

-- Bảng Phiếu Thanh Lý
CREATE TABLE PhieuThanhLy (
    MaPhieuTL INT PRIMARY KEY IDENTITY,
    LyDo NVARCHAR(255),
    TrangThai NVARCHAR(50) NOT NULL,
    PhuongThucThanhLy NVARCHAR(50),
    NgayTao DATE NOT NULL,
    MaNguoiDung INT NOT NULL,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);
-- Bảng Duyệt Phiếu Thanh Lý
CREATE TABLE DuyetPhieuTL (
    MaPhieuTL INT NOT NULL,
	MaNguoiDung INT NOT NULL,
    NgayDuyet DATE NOT NULL,
    TrangThai NVARCHAR(50),
	PRIMARY KEY (MaPhieuTL, MaNguoiDung),
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	FOREIGN KEY (MaPhieuTL) REFERENCES PhieuThanhLy(MaPhieuTL)
);


-- Bảng Môn Học
CREATE TABLE MonHoc (
    MaMon INT PRIMARY KEY IDENTITY,
    TenMon NVARCHAR(255) NOT NULL,
    SoTC INT NOT NULL
);
-- Bảng Lớp Học Phần
CREATE TABLE LopHocPhan (
    MaLHP INT PRIMARY KEY IDENTITY,
    SiSo INT NOT NULL,
    GVDay NVARCHAR(100),
    MaMon INT NOT NULL,
    FOREIGN KEY (MaMon) REFERENCES MonHoc(MaMon),
);

-- Bảng Phiếu Phân Bổ
CREATE TABLE PhieuPhanBo (
    MaPhieuPB INT PRIMARY KEY IDENTITY,
    NgayLap DATE NOT NULL,
    NoiDung NVARCHAR(255),
	MaLHP INT NOT NULL,
	FOREIGN KEY (MaLHP) REFERENCES LopHocPhan(MaLHP)
);



-- Bảng Phiếu Đề Xuất
CREATE TABLE PhieuDeXuat (
    MaPhieuDX INT PRIMARY KEY IDENTITY,
    SoLuongDeXuat INT NOT NULL,
    LyDo NVARCHAR(255),
    TrangThai NVARCHAR(50) NOT NULL,
    NgayTao DATE NOT NULL,
    MaNguoiDung INT NOT NULL, 
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

-- Bảng Duyệt Phiếu Đề Xuất
CREATE TABLE DuyetPhieuDX (
    MaPhieuDX INT NOT NULL,
	MaNguoiDung INT NOT NULL,
    NgayDuyet DATE NOT NULL,
    TrangThai NVARCHAR(50) NOT NULL,
	PRIMARY KEY (MaPhieuDX, MaNguoiDung),
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	FOREIGN KEY (MaPhieuDX) REFERENCES PhieuDeXuat(MaPhieuDX)
);

-- Bảng Hóa Chất
CREATE TABLE HoaChat (
    MaHoaChat INT PRIMARY KEY IDENTITY,
    SoCAS NVARCHAR(50) NOT NULL UNIQUE,
    TenHoaChat NVARCHAR(255) NOT NULL,
    DonVi NVARCHAR(50) NOT NULL,
    MoTa NVARCHAR(255),
    CongThucHoaHoc NVARCHAR(255),
    NguyHiem NVARCHAR(255),
    SoLieuAnToan NVARCHAR(255),
    ThoiHanSuDung DATE,
    HinhAnh NVARCHAR(255),
    NgayTao DATE NOT NULL
);


-- Bảng Chi Tiết Đề Xuất (Kết nối nhiều-nhiều giữa Phiếu Đề Xuất và Hóa Chất)
CREATE TABLE ChiTietDeXuat (
    MaPhieuDX INT NOT NULL,
	MaHoaChat INT NOT NULL,
    SoLuong INT NOT NULL,
    DonGia DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY (MaPhieuDX, MaHoaChat),
    FOREIGN KEY (MaPhieuDX) REFERENCES PhieuDeXuat(MaPhieuDX),
    FOREIGN KEY (MaHoaChat) REFERENCES HoaChat(MaHoaChat)
);

-- Bảng Phiếu Nhập
CREATE TABLE PhieuNhap (
    MaPhieuNhap INT PRIMARY KEY IDENTITY,
    SoLuongNhap INT NOT NULL,
    NgayNhap DATE NOT NULL,
    GhiChu NVARCHAR(255),
    MaNguoiDung INT NOT NULL,
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

-- Bảng Lô Hóa Chất
CREATE TABLE LoHoaChat (
    MaLo INT PRIMARY KEY IDENTITY,
    NhaCungCap NVARCHAR(255),
    SoLuong INT NOT NULL,
    HanSuDung DATE NOT NULL,
    TrangThai NVARCHAR(50) NOT NULL,
    SoLuongTon INT NOT NULL,
    GhiChu NVARCHAR(255),
    MaHoaChat INT NOT NULL,
	MaPhieuTL INT,
	MaPhieuNhap INT,
    FOREIGN KEY (MaHoaChat) REFERENCES HoaChat(MaHoaChat),
	FOREIGN KEY (MaPhieuTL) REFERENCES PhieuThanhLy(MaPhieuTL),
	FOREIGN KEY (MaPhieuNhap) REFERENCES PhieuNhap(MaPhieuNhap)
);

-- Bảng Chi Tiết Phân Bổ (Kết nối nhiều-nhiều giữa Phiếu Phân Bổ và Lớp Học Phần)
CREATE TABLE ChiTietPhanBo (
    MaPhieuPB INT NOT NULL,
    MaLo INT NOT NULL,
    SoLuong INT NOT NULL,
    PRIMARY KEY (MaPhieuPB, MaLo),
    FOREIGN KEY (MaPhieuPB) REFERENCES PhieuPhanBo(MaPhieuPB),
    FOREIGN KEY (MaLo) REFERENCES LoHoaChat(MaLo)
);


-- Bảng Bài Thí Nghiệm
CREATE TABLE BaiThiNghiem (
    MaBaiTN INT PRIMARY KEY IDENTITY,
    TenBaiTN NVARCHAR(255) NOT NULL,
    MaMon INT NOT NULL,
    FOREIGN KEY (MaMon) REFERENCES MonHoc(MaMon)
);

-- Bảng Dự Trữ (Kết nối nhiều-nhiều giữa Lô Hóa Chất và Phiếu Nhập)
CREATE TABLE DuTru (
    --MaLo INT NOT NULL,
    MaHoaChat INT NOT NULL,
	MaBaiTN INT NOT NULL,
    SoLuong INT NOT NULL,
    PRIMARY KEY (MaHoaChat, MaBaiTN),
    FOREIGN KEY (MaBaiTN) REFERENCES BaiThiNghiem(MaBaiTN),
    FOREIGN KEY (MaHoaChat) REFERENCES HoaChat(MaHoaChat)
);