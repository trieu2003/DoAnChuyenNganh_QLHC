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
--NguoiDung(MaNguoiDung, TenDangNhap, MatKhauHash, Email, VaiTro ,NgayTao, HinhAnh )
INSERT INTO NguoiDung (TenDangNhap, MatKhauHash, Email, VaiTro, NgayTao, HinhAnh) 
VALUES 
('user1', 'hash1', 'user1@example.com', 'Admin', '2024-01-01', 'image1.jpg'),
('user2', 'hash2', 'user2@example.com', 'User', '2024-01-02', 'image2.jpg'),
('user3', 'hash3', 'user3@example.com', 'Admin', '2024-01-03', 'image3.jpg'),
('user4', 'hash4', 'user4@example.com', 'User', '2024-01-04', 'image4.jpg'),
('user5', 'hash5', 'user5@example.com', 'Admin', '2024-01-05', 'image5.jpg'),
('user6', 'hash6', 'user6@example.com', 'User', '2024-01-06', 'image6.jpg'),
('user7', 'hash7', 'user7@example.com', 'Admin', '2024-01-07', 'image7.jpg'),
('user8', 'hash8', 'user8@example.com', 'User', '2024-01-08', 'image8.jpg'),
('user9', 'hash9', 'user9@example.com', 'Admin', '2024-01-09', 'image9.jpg'),
('user10', 'hash10', 'user10@example.com', 'User', '2024-01-10', 'image10.jpg');
Select * from NguoiDung

--PhieuThanhLy (MaPhieuTL, LyDo, TrangThai, PhuongThucThanhLy, NgayTao, MaNguoiDung)
INSERT INTO PhieuThanhLy (LyDo, TrangThai, PhuongThucThanhLy, NgayTao, MaNguoiDung) 
VALUES 
(N'Lý do 1', N'Đã duyệt', N'Bán', '2024-02-01', 1),
(N'Lý do 2', N'Chờ duyệt', N'Tái sử dụng', '2024-02-02', 2),
(N'Lý do 3', N'Đã duyệt', N'Bán', '2024-02-03', 3),
(N'Lý do 4', N'Chờ duyệt', N'Tái sử dụng', '2024-02-04', 4),
(N'Lý do 5', N'Đã duyệt', N'Bán', '2024-02-05', 5),
(N'Lý do 6', N'Chờ duyệt', N'Tái sử dụng', '2024-02-06', 6),
(N'Lý do 7', N'Đã duyệt', N'Bán', '2024-02-07', 7),
(N'Lý do 8', N'Chờ duyệt', N'Tái sử dụng', '2024-02-08', 8),
(N'Lý do 9', N'Đã duyệt', N'Bán', '2024-02-09', 9),
(N'Lý do 10', N'Chờ duyệt', N'Tái sử dụng', '2024-02-10', 10);

--DuyetPhieuTL (MaPhieuTL, MaNguoiDung, NgayDuyet, TrangThai)
INSERT INTO DuyetPhieuTL (MaPhieuTL, MaNguoiDung, NgayDuyet, TrangThai) 
VALUES 
(1, 2, '2024-03-01', N'Đã duyệt'),
(2, 3, '2024-03-02', N'Chờ duyệt'),
(3, 4, '2024-03-03', N'Đã duyệt'),
(4, 5, '2024-03-04', N'Chờ duyệt'),
(5, 6, '2024-03-05', N'Đã duyệt'),
(6, 7, '2024-03-06', N'Chờ duyệt'),
(7, 8, '2024-03-07', N'Đã duyệt'),
(8, 9, '2024-03-08', N'Chờ duyệt'),
(9, 10, '2024-03-09', N'Đã duyệt'),
(10, 1, '2024-03-10', N'Chờ duyệt');

--MonHoc (MaMon, TenMon, SoTC)
INSERT INTO MonHoc (TenMon, SoTC) 
VALUES 
(N'Hóa đại cương', 3),
(N'Vật lý hóa học', 3),
(N'Hóa phân tích', 3),
(N'Sinh hóa học', 2),
(N'Kỹ thuật an toàn hóa chất', 3),
(N'Quản lý môi trường trong phòng thí nghiệm', 2),
(N'Công nghệ hóa học', 3),
(N'Pháp chế hóa chất', 3),
(N'Ứng dụng hóa chất trong công nghiệp', 2),
(N'Thực hành thí nghiệm hóa học', 1);

--LopHocPhan (MaLHP, SiSo, GVDay, MaMon)
INSERT INTO LopHocPhan (SiSo, GVDay, MaMon) 
VALUES 
(30, N'Thầy Anh', 1),
(25, N'Thầy Bình', 2),
(40, N'Cô Cúc', 3),
(35, N'Thầy Dương', 4),
(20, N'Cô ÁNh', 5),
(45, N'Thầy Phát', 6),
(50, N'Cô Giang', 7),
(28, N'Thầy Hùng', 8),
(32, N'Cô Kính', 9),
(38, N'Thầy Khoa', 10);

--PhieuPhanBo (MaPhieuPB, NgayLap, NoiDung, MaLHP)
INSERT INTO PhieuPhanBo (NgayLap, NoiDung, MaLHP) 
VALUES 
('2024-04-01', N'Phân bổ hóa chất', 1),
('2024-04-02', N'Phân bổ hóa chất', 2),
('2024-04-03', N'Phân bổ hóa chất', 3),
('2024-04-04', N'Phân bổ hóa chất', 4),
('2024-04-05', N'Phân bổ hóa chất', 5),
('2024-04-06', N'Phân bổ hóa chất', 6),
('2024-04-07', N'Phân bổ hóa chất', 7),
('2024-04-08', N'Phân bổ hóa chất', 8),
('2024-04-09', N'Phân bổ hóa chất', 9),
('2024-04-10', N'Phân bổ hóa chất', 10);

--PhieuDeXuat (MaPhieuDX, SoLuongDeXuat, LyDo, TrangThai, NgayTao, MaNguoiDung)
INSERT INTO PhieuDeXuat (SoLuongDeXuat, LyDo, TrangThai, NgayTao, MaNguoiDung) 
VALUES 
(100, N'Cần cho thí nghiệm', N'Đã duyệt', '2024-05-01', 1),
(150, N'Cần thêm hóa chất', N'Chờ duyệt', '2024-05-02', 2),
(200, N'Dự trữ', N'Đã duyệt', '2024-05-03', 3),
(120, N'Dùng cho lớp học', N'Chờ duyệt', '2024-05-04', 4),
(130, N'Dự trữ hóa chất', N'Đã duyệt', '2024-05-05', 5),
(180, N'Cần gấp', 'Chờ duyệt', N'2024-05-06', 6),
(110, N'Dùng cho thí nghiệm', N'Đã duyệt', '2024-05-07', 7),
(160, N'Bổ sung hóa chất', N'Chờ duyệt', '2024-05-08', 8),
(140, N'Cần thêm cho thí nghiệm', N'Đã duyệt', '2024-05-09', 9),
(170, N'Phân bổ cho lớp', N'Chờ duyệt', '2024-05-10', 10);

--DuyetPhieuDX (MaPhieuDX, MaNguoiDung, NgayDuyet, TrangThai)
INSERT INTO DuyetPhieuDX (MaPhieuDX, MaNguoiDung, NgayDuyet, TrangThai) 
VALUES 
(1, 2, '2024-06-01', N'Đã duyệt'),
(2, 3, '2024-06-02', N'Chờ duyệt'),
(3, 4, '2024-06-03', N'Đã duyệt'),
(4, 5, '2024-06-04', N'Chờ duyệt'),
(5, 6, '2024-06-05',N'Đã duyệt'),
(6, 7, '2024-06-06', N'Chờ duyệt'),
(7, 8, '2024-06-07', N'Đã duyệt'),
(8, 9, '2024-06-08', N'Chờ duyệt'),
(9, 10, '2024-06-09', N'Đã duyệt'),
(10, 1, '2024-06-10', N'Chờ duyệt');

--HoaChat (MaHoaChat, SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('66-71-7', '1,10-Phenanthroline', 'g', NULL, 'C12H8N2', NULL, NULL, '2025-01-01', 'image1.jpg', '2024-10-01'),
('123-91-1', '1,4-Dioxane', 'mL', NULL, 'C4H8O2', NULL, NULL, '2025-01-01', 'image2.jpg', '2024-10-01'),
('130-23-4', '1-amino-2 naphtol-4 sunfonic acid', 'g', NULL, 'C10H9NO4S', NULL, NULL, '2025-01-01', 'image3.jpg', '2024-10-01'),
('62-53-3', 'Aniline', 'mL', NULL, 'C6H5NH2', NULL, NULL, '2025-01-01', 'image4.jpg', '2024-10-01'),
('69-72-7', 'Salicylic Acid', 'g', NULL, 'C7H6O3', NULL, NULL, '2025-01-01', 'image5.jpg', '2024-10-01');

INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('51-28-5', '2,4-Dinitrophenyl hydrazin', 'g', NULL, 'C6H6N4O4', NULL, NULL, '2025-02-01', 'image6.jpg', '2024-10-01'),
('88-85-7', '2,4-Dichlorophenoxyacetic acid', 'g', NULL, 'C8H6Cl2O3', NULL, NULL, '2025-02-01', 'image7.jpg', '2024-10-01'),
('133-07-3', '2,6-Dichloroquinone-4-Chloroimide', 'g', NULL, 'C6H2Cl3NO', NULL, NULL, '2025-02-01', 'image8.jpg', '2024-10-01'),
('50-00-0', 'Formaldehyde', 'mL', NULL, 'CH2O', NULL, NULL, '2025-02-01', 'image9.jpg', '2024-10-01'),
('67-56-1', 'Methanol', 'mL', NULL, 'CH3OH', NULL, NULL, '2025-02-01', 'image10.jpg', '2024-10-01'),
('64-19-7', 'Acetic Acid', 'mL', NULL, 'C2H4O2', NULL, NULL, '2025-02-01', 'image11.jpg', '2024-10-01'),
('67-63-0', 'Isopropyl Alcohol', 'mL', NULL, 'C3H8O', NULL, NULL, '2025-02-01', 'image12.jpg', '2024-10-01'),
('75-65-0', 'Tert-Butanol', 'g', NULL, 'C4H10O', NULL, NULL, '2025-02-01', 'image13.jpg', '2024-10-01'),
('108-95-2', 'Phenol', 'g', NULL, 'C6H6O', NULL, NULL, '2025-02-01', 'image14.jpg', '2024-10-01'),
('71-43-2', 'Benzene', 'mL', NULL, 'C6H6', NULL, NULL, '2025-02-01', 'image15.jpg', '2024-10-01');


INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('110-54-3', 'Hexane', 'mL', NULL, 'C6H14', NULL, NULL, '2025-02-01', 'image16.jpg', '2024-10-01'),
('79-09-4', 'Propionic Acid', 'mL', NULL, 'C3H6O2', NULL, NULL, '2025-02-01', 'image17.jpg', '2024-10-01'),
('64-18-6', 'Formic Acid', 'mL', NULL, 'CH2O2', NULL, NULL, '2025-02-01', 'image18.jpg', '2024-10-01'),
('141-43-5', 'Ethanolamine', 'mL', NULL, 'C2H7NO', NULL, NULL, '2025-02-01', 'image19.jpg', '2024-10-01'),
('108-88-3', 'Toluene', 'mL', NULL, 'C7H8', NULL, NULL, '2025-02-01', 'image20.jpg', '2024-10-01'),
('75-21-8', 'Ethylene Oxide', 'g', NULL, 'C2H4O', NULL, NULL, '2025-02-01', 'image21.jpg', '2024-10-01'),
('109-99-9', 'Tetrahydrofuran', 'mL', NULL, 'C4H8O', NULL, NULL, '2025-02-01', 'image22.jpg', '2024-10-01'),
('67-64-1', 'Acetone', 'mL', NULL, 'C3H6O', NULL, NULL, '2025-02-01', 'image23.jpg', '2024-10-01'),
('108-05-4', 'Vinyl Acetate', 'mL', NULL, 'C4H6O2', NULL, NULL, '2025-02-01', 'image24.jpg', '2024-10-01'),
('75-09-2', 'Dichloromethane', 'mL', NULL, 'CH2Cl2', NULL, NULL, '2025-02-01', 'image25.jpg', '2024-10-01');

INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('107-13-1', 'Acrylonitrile', 'mL', NULL, 'C3H3N', NULL, NULL, '2025-02-01', 'image27.jpg', '2024-10-01'),
('71-36-3', 'n-Butanol', 'mL', NULL, 'C4H10O', NULL, NULL, '2025-02-01', 'image28.jpg', '2024-10-01'),
('123-72-8', 'Butanal', 'mL', NULL, 'C4H8O', NULL, NULL, '2025-02-01', 'image29.jpg', '2024-10-01'),
('110-82-7', 'Cyclohexane', 'mL', NULL, 'C6H12', NULL, NULL, '2025-02-01', 'image30.jpg', '2024-10-01'),
('67-66-3', 'Chloroform', 'mL', NULL, 'CHCl3', NULL, NULL, '2025-02-01', 'image31.jpg', '2024-10-01'),
('106-46-7', '1,4-Dichlorobenzene', 'g', NULL, 'C6H4Cl2', NULL, NULL, '2025-02-01', 'image32.jpg', '2024-10-01'),
('75-44-5', 'Phosgene', 'g', NULL, 'COCl2', NULL, NULL, '2025-02-01', 'image33.jpg', '2024-10-01'),
('108-24-7', 'Acetic Anhydride', 'mL', NULL, 'C4H6O3', NULL, NULL, '2025-02-01', 'image34.jpg', '2024-10-01'),
('110-00-9', 'Furan', 'mL', NULL, 'C4H4O', NULL, NULL, '2025-02-01', 'image35.jpg', '2024-10-01');



--ChiTietDeXuat (MaPhieuDX, MaHoaChat, SoLuong, DonGia)
INSERT INTO ChiTietDeXuat (MaPhieuDX, MaHoaChat, SoLuong, DonGia) 
VALUES 
(1, 1, 10, 10000),
(2, 2, 15, 15000),
(3, 3, 20, 20000),
(4, 4, 12, 12000),
(5, 5, 13, 13000),
(6, 6, 18, 18000),
(7, 7, 11, 11000),
(8, 8, 16, 16000),
(9, 9, 14, 14000),
(10, 10, 17, 17000);

--PhieuNhap (MaPhieuNhap, SoLuongNhap, NgayNhap, GhiChu, MaNguoiDung)
INSERT INTO PhieuNhap (SoLuongNhap, NgayNhap, GhiChu, MaNguoiDung) 
VALUES 
(100, '2024-07-01', N'Nhập hàng đợt 1', 1),
(150, '2024-07-02', N'Nhập hàng đợt 2', 2),
(200, '2024-07-03', N'Nhập hàng đợt 3', 3),
(120, '2024-07-04', N'Nhập hàng đợt 4', 4),
(130, '2024-07-05', N'Nhập hàng đợt 5', 5),
(180, '2024-07-06', N'Nhập hàng đợt 6', 6),
(110, '2024-07-07', N'Nhập hàng đợt 7', 7),
(160, '2024-07-08', N'Nhập hàng đợt 8', 8),
(140, '2024-07-09', N'Nhập hàng đợt 9', 9),
(170, '2024-07-10', N'Nhập hàng đợt 10', 10);

--LoHoaChat (MaLo, NhaCungCap, SoLuong, HanSuDung, TrangThai, SoLuongTon, GhiChu, MaHoaChat, MaPhieuTL, MaPhieuNhap)
INSERT INTO LoHoaChat (NhaCungCap, SoLuong, HanSuDung, TrangThai, SoLuongTon, GhiChu, MaHoaChat, MaPhieuTL, MaPhieuNhap)
VALUES
(N'Công ty Cổ phần Hóa chất TPHCM', 100, '2026-12-31', N'Đang sử dụng', 80, N'Lô nhập tháng 10', 1, NULL, 1),
(N'Công ty TNHH Thương mại Dịch vụ Xuất Nhập khẩu Khánh An Sài Gòn', 200, '2026-12-31', N'Đang sử dụng', 150, N'Lô nhập tháng 10', 2, NULL, 2),
(N'Công ty TNHH Hóa chất Thành Phương', 150, '2026-12-31', N'Đang sử dụng', 100, N'Lô nhập tháng 10', 3, NULL, 3),
(N'Công ty Cổ phần Đầu tư Phát triển Lộc Thiên', 50, '2026-12-31', N'Đang sử dụng', 40, N'Lô nhập tháng 10', 4, NULL, 4),
(N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 75, '2026-12-31', N'Đang sử dụng', 60, N'Lô nhập tháng 10', 5, NULL, 5);

--ChiTietPhanBo (MaPhieuPB, MaLo, SoLuong)
INSERT INTO ChiTietPhanBo (MaPhieuPB, MaLo, SoLuong) 
VALUES 
(1, 1, 10),
(2, 2, 15),
(3, 3, 20),
(4, 4, 12),
(5, 5, 13)
--(6, 6, 18),
--(7, 7, 11),
--(8, 8, 16),
--(9, 9, 14),
--(10, 10, 17);

--BaiThiNghiem (MaBaiTN, TenBaiTN, MaMon)
INSERT INTO BaiThiNghiem (TenBaiTN, MaMon) 
VALUES 
(N'Thí nghiệm Hóa đại cương', 1),
(N'Thí nghiệm Vật lý hóa học', 2),
(N'Thí nghiệm Hóa phân tích', 3),
(N'Thí nghiệm Sinh hóa học', 4),
(N'Thí nghiệm Kỹ thuật an toàn hóa chất', 5),
(N'Thí nghiệm Quản lý môi trường trong phòng thí nghiệm', 6),
(N'Thí nghiệm Công nghệ hóa học', 7),
(N'Thí nghiệm Pháp chế hóa chất', 8),
(N'Thí nghiệm Ứng dụng hóa chất trong công nghiệp', 9),
(N'Thí nghiệm Thực hành thí nghiệm hóa học', 10);

--DuTru (MaHoaChat, MaBaiTN, SoLuong)
INSERT INTO DuTru (MaHoaChat, MaBaiTN, SoLuong) 
VALUES 
(1, 1, 10),
(2, 2, 15),
(3, 3, 20),
(4, 4, 12),
(5, 5, 13),
(6, 6, 18),
(7, 7, 11),
(8, 8, 16),
(9, 9, 14),
(10, 10, 17);
