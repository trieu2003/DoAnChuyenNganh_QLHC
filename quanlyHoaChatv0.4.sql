--DROP DATABASE QLHC_NHOM94
CREATE DATABASE QLHC_NHOM94
GO
USE QLHC_NHOM94
GO
-- Bảng Người Dùng
CREATE TABLE NguoiDung (
    MaNguoiDung INT PRIMARY KEY IDENTITY,
    TenDangNhap NVARCHAR(50) NOT NULL UNIQUE,
	TenNguoiDung NVARCHAR(255),
    MatKhauHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    VaiTro NVARCHAR(50),
    NgayTao DATE NOT NULL,
    HinhAnh NVARCHAR(255)
);

-- Bảng Phiếu Thanh Lý
CREATE TABLE PhieuThanhLy (
    [MaPhieuTL] INT IDENTITY(1,1) NOT NULL,
    [LyDo] NVARCHAR(255) NULL,
    [TrangThai] NVARCHAR(50) NOT NULL,
    [PhuongThucThanhLy] NVARCHAR(50) NULL,
    [NgayTao] DATE NOT NULL,
    [MaNguoiDung] INT NOT NULL,
    CONSTRAINT PK_PhieuThanhLy PRIMARY KEY ([MaPhieuTL]),
    CONSTRAINT PK_PhieuThanhLy_NguoiDung FOREIGN KEY ([MaNguoiDung] ) REFERENCES NguoiDung(MaNguoiDung)
);
-- Bảng Duyệt Phiếu Thanh Lý
CREATE TABLE DuyetPhieuTL (
	MaLichSu INT PRIMARY KEY IDENTITY,
    MaPhieuTL INT NOT NULL,
	MaNguoiDung INT NOT NULL,
    NgayDuyet DATE NOT NULL,
    TrangThai NVARCHAR(50),
	LyDoTuChoi NVARCHAR(255),
	--PRIMARY KEY (MaPhieuTL, MaNguoiDung),
	CONSTRAINT FK_DuyetPhieuTL_NguoiDung FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	CONSTRAINT FK_DuyetPhieuTL_PhongThanhLy FOREIGN KEY (MaPhieuTL) REFERENCES PhieuThanhLy(MaPhieuTL)
);
--ALTER TABLE DuyetPhieuTL DROP CONSTRAINT PK__DuyetPhi__B45DAA35A6058CC7;
--ALTER TABLE DuyetPhieuTL ADD MaLichSu INT IDENTITY(1,1);
--ALTER TABLE DuyetPhieuTL ADD CONSTRAINT PK_DuyetPhieuTL PRIMARY KEY (MaLichSu);
--ALTER TABLE DuyetPhieuTL ADD LyDoTuChoi NVARCHAR(255)
-- Bảng Môn Học
CREATE TABLE MonHoc (
    MaMon INT PRIMARY KEY IDENTITY,
    TenMon NVARCHAR(255) NOT NULL,
    SoTC INT NOT NULL
);
-- Bảng Lớp Học Phần
CREATE TABLE LopHocPhan (
    MaLHP INT PRIMARY KEY IDENTITY,
	TenLopHocPhan VARCHAR(15),
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
    LyDo NVARCHAR(255),
    TrangThai NVARCHAR(50) NOT NULL,
    NgayTao DATETIME NOT NULL,
    MaNguoiDung INT NOT NULL, 
    FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung)
);

-- Bảng Duyệt Phiếu Đề Xuất
CREATE TABLE DuyetPhieuDX (
	MaLichSu INT PRIMARY KEY IDENTITY,
    MaPhieuDX INT NOT NULL,
	MaNguoiDung INT NOT NULL,
    NgayDuyet DATETIME NOT NULL,
    TrangThai NVARCHAR(50) NOT NULL,
	LyDoTuChoi NVARCHAR(255),
	--PRIMARY KEY (MaPhieuDX, MaNguoiDung),
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung(MaNguoiDung),
	FOREIGN KEY (MaPhieuDX) REFERENCES PhieuDeXuat(MaPhieuDX)
);
--ALTER TABLE DuyetPhieuDX DROP CONSTRAINT PK__DuyetPhi__B45F542D959A38D7;
--ALTER TABLE DuyetPhieuDX ADD MaLichSu INT IDENTITY(1,1);
--ALTER TABLE DuyetPhieuDX ADD CONSTRAINT PK_DuyetPhieuDX PRIMARY KEY (MaLichSu);

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
	SoLo VARCHAR(20) NOT NULL,
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
--NguoiDung(MaNguoiDung, TenDangNhap,TenNguoiDung, MatKhauHash, Email, VaiTro ,NgayTao, HinhAnh )
INSERT INTO NguoiDung (TenDangNhap, TenNguoiDung, MatKhauHash, Email, VaiTro, NgayTao, HinhAnh) 
VALUES 
('user1', N'Thanh Triệu', '00c6ee2e21a7548de6260cf72c4f4b5b', 'user1@example.com', 'Admin', '2024-01-01', 'image1.jpg'),
('user2', N'Tuấn Khang', '58833651db311ba4bc11cb26b1900b0f', 'user2@example.com', 'Admin', '2024-01-02', 'image2.jpg'),
('user3', N'Trần Tuấn', '1a4ead8b39d17dfe89418452c9bba770', 'user3@example.com', N'Nhân viên', '2024-01-03', 'image3.jpg'),
('user4', N'Tri Thuỷ', 'd80b0d6020798ff15e8d5416911201aa', 'user4@example.com', 'Nhân viên', '2024-01-04', 'image4.jpg'),
('user5', N'Ngọc Lan', '2ce8a4621b2843043725992ab2a61acc', 'user5@example.com', N'Nhân viên', '2024-01-05', 'image5.jpg'),
('user6', N'Minh Đức', 'be796e420febda49c29e38745db3cae2', 'user6@example.com', N'Giảng viên', '2024-01-06', 'image6.jpg'),
('user7', N'Nhật Lệ', '6c72a0f18b5230ecc4ff7e278991e5c5', 'user7@example.com', N'Giảng viên', '2024-01-07', 'image7.jpg'),
('user8', N'Kim Hoa', '35e8b4b7776fc46cc10e7970935f2ca6', 'user8@example.com', 'Nhân viên', '2024-01-08', 'image8.jpg'),
('user9', N'Chí Cường', '1167fa03beba0659fdabc33b4620599d', 'user9@example.com', N'Giảng viên', '2024-01-09', 'image9.jpg'),
('user10', N'Xuân Mạnh', '162de50854fb25ea3fd8640282cb67b4', 'user10@example.com', N'Giảng viên', '2024-01-10', 'image10.jpg');
Select * from NguoiDung

--PhieuThanhLy (MaPhieuTL, LyDo, TrangThai, PhuongThucThanhLy, NgayTao, MaNguoiDung)
INSERT INTO PhieuThanhLy (LyDo, TrangThai, PhuongThucThanhLy, NgayTao, MaNguoiDung) 
VALUES 
(N'Lý do thanh lý hóa chất cũ', N'Chờ duyệt', N'Bán', '2024-11-24', 1),  -- Dữ liệu mẫu 1
(N'Hóa chất hết hạn sử dụng', N'Chờ duyệt', N'Hủy', '2024-11-25', 2),    -- Dữ liệu mẫu 2
(N'Thanh lý do không cần thiết nữa', N'Chờ duyệt', N'Bán', '2024-11-26', 3); -- Dữ liệu mẫu 3
--DuyetPhieuTL (MaPhieuTL, MaNguoiDung, NgayDuyet, TrangThai)
INSERT INTO DuyetPhieuTL (MaPhieuTL, MaNguoiDung, NgayDuyet, TrangThai) 
VALUES 
(1, 2, '2024-11-25', N'Chờ duyệt'),  
(2, 2, '2024-11-26', N'Chờ duyệt'), 
(3, 1, '2024-11-27', N'Chờ duyệt');   

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

--LopHocPhan (MaLHP, SiSo, GVDay, MaMon,TenLopHocPhan)
INSERT INTO LopHocPhan (SiSo, GVDay, MaMon,TenLopHocPhan) 
VALUES 
(30, N'Thầy Trần Tuấn', 1,'LOPH001'),
(25, N'Thầy Bình', 2,'LOPH002'),
(40, N'Cô Nhật Lệ', 3,'LOPH003'),
(35, N'Thầy Dương', 4,'LOPH004'),
(20, N'Cô Ngọc Lan', 5,'LOPSH01'),
(45, N'Thầy Minh Đức', 6,'LOPSH02'),
(50, N'Cô Giang', 7,'LOPSH03'),
(28, N'Thầy Chí Cường', 8,'LOPSH04'),
(32, N'Cô Kim Hoa', 9,'LOPSH05'),
(38, N'Thầy XUân Mạnh', 10,'LOPSH06');

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
INSERT INTO PhieuDeXuat (LyDo, TrangThai, NgayTao, MaNguoiDung) 
VALUES 
(N'Cần cho thí nghiệm', N'Đã duyệt', '2024-05-01', 6),
(N'Cần thêm hóa chất', N'Chờ duyệt', '2024-05-02', 7),
(N'Dự trữ', N'Đã duyệt', '2024-05-03', 6),
(N'Dùng cho lớp học', N'Chờ duyệt', '2024-05-04', 6),
(N'Dự trữ hóa chất', N'Đã duyệt', '2024-05-05', 7),
(N'Cần gấp', N'Chờ duyệt', N'2024-05-06', 6),
(N'Dùng cho thí nghiệm', N'Đã duyệt', '2024-05-07', 7),
(N'Bổ sung hóa chất', N'Chờ duyệt', '2024-05-08', 9),
(N'Cần thêm cho thí nghiệm', N'Đã duyệt', '2024-05-09', 9),
(N'Phân bổ cho lớp', N'Chờ duyệt', '2024-05-10', 10);

--DuyetPhieuDX (MaPhieuDX, MaNguoiDung, NgayDuyet, TrangThai)
INSERT INTO DuyetPhieuDX (MaPhieuDX, MaNguoiDung, NgayDuyet, TrangThai) 
VALUES 
(1, 1, '2024-06-01', N'Đã duyệt'),
(3, 2, '2024-06-03', N'Đã duyệt'),
(5, 2, '2024-06-05',N'Đã duyệt'),
(7, 1, '2024-06-07', N'Đã duyệt'),
(9, 2, '2024-06-09', N'Đã duyệt'),
(10, 2, '2024-06-10', N'Từ Chối');

--HoaChat (MaHoaChat, SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('66-71-7', '1,10-Phenanthroline', 'g', N'Hợp chất hữu cơ được sử dụng trong phân tích hóa học', 'C12H8N2', N'Nguy hiểm khi hít phải hoặc tiếp xúc với da', N'Mang khẩu trang và găng tay khi xử lý', '2025-01-01', 'image1.jpg', '2024-10-01'),
('123-91-1', '1,4-Dioxane', 'mL', N'Dung môi hữu cơ dùng trong tổng hợp hóa học', 'C4H8O2', N'Dễ cháy, có thể gây kích ứng đường hô hấp', N'Làm việc trong môi trường thông thoáng, tránh lửa', '2025-01-01', 'image2.jpg', '2024-10-01'),
('130-23-4', '1-amino-2 naphtol-4 sunfonic acid', 'g', N'Chất màu dùng trong nghiên cứu hóa học', 'C10H9NO4S', N'Tiếp xúc lâu dài có thể gây tổn thương nội tạng', N'Sử dụng kính bảo hộ và mặt nạ', '2025-01-01', 'image3.jpg', '2024-10-01'),
('62-53-3', 'Aniline', 'mL', N'Dung môi phổ biến trong phòng thí nghiệm', 'C6H5NH2', N'Độc hại khi uống, nguy hiểm khi hít phải', N'Không ăn uống hoặc hút thuốc khi sử dụng', '2025-01-01', 'image4.jpg', '2024-10-01'),
('69-72-7', 'Salicylic Acid', 'g', N'Chất sử dụng trong dược phẩm và mỹ phẩm', 'C7H6O3', N'Gây kích ứng mắt và da, có thể gây dị ứng', N'Rửa sạch bằng nước sau khi tiếp xúc', '2025-01-01', 'image5.jpg', '2024-10-01');

INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('51-28-5', '2,4-Dinitrophenyl hydrazin', 'g', N'Hợp chất hữu cơ dễ cháy dùng trong phân tích', 'C6H6N4O4', N'Dễ cháy, độc hại nếu hít phải', N'Bảo quản tránh xa nhiệt và lửa', '2025-02-01', 'image6.jpg', '2024-10-01'),
('88-85-7', '2,4-Dichlorophenoxyacetic acid', 'g', N'Hóa chất dùng trong bảo vệ thực vật', 'C8H6Cl2O3', N'Nguy hiểm cho môi trường nước', N'Sử dụng đồ bảo hộ khi làm việc', '2025-02-01', 'image7.jpg', '2024-10-01'),
('133-07-3', '2,6-Dichloroquinone-4-Chloroimide', 'g', N'Hóa chất dùng trong thử nghiệm màu sắc', 'C6H2Cl3NO', N'Có thể gây kích ứng mạnh khi tiếp xúc', N'Deo găng tay và kính bảo hộ', '2025-02-01', 'image8.jpg', '2024-10-01'),
('50-00-0', 'Formaldehyde', 'mL', N'Dùng trong sản xuất nhựa và chất dẻo', 'CH2O', N'Cực độc, nguy hiểm khi hít phải', N'Sử dụng trong không gian thoáng khí', '2025-02-01', 'image9.jpg', '2024-10-01'),
('67-56-1', 'Methanol', 'mL', N'Dung môi phổ biến trong công nghiệp hóa chất', 'CH3OH', N'Nguy hiểm nếu uống phải, dễ cháy', N'Tránh xa nguồn lửa và không uống phải', '2025-02-01', 'image10.jpg', '2024-10-01'),
('64-19-7', 'Acetic Acid', 'mL', N'Dung môi axit phổ biến trong phòng thí nghiệm', 'C2H4O2', N'Gây kích ứng mạnh nếu tiếp xúc trực tiếp', N'Sử dụng trong môi trường thông thoáng', '2025-02-01', 'image11.jpg', '2024-10-01'),
('67-63-0', 'Isopropyl Alcohol', 'mL', N'Chất tẩy rửa phổ biến trong công nghiệp', 'C3H8O', N'Nguy hiểm khi hít phải hơi cồn', N'Mang đồ bảo hộ khi làm việc', '2025-02-01', 'image12.jpg', '2024-10-01'),
('75-65-0', 'Tert-Butanol', 'g', N'Dùng trong điều chế hóa chất hữu cơ', 'C4H10O', N'Độc hại khi tiếp xúc lâu dài', N'Bảo quản tránh nhiệt độ cao', '2025-02-01', 'image13.jpg', '2024-10-01'),
('108-95-2', 'Phenol', 'g', N'Dùng làm nguyên liệu cho nhựa tổng hợp', 'C6H6O', N'Cực kỳ độc hại, gây bỏng nếu tiếp xúc', N'Deo kính bảo hộ và găng tay', '2025-02-01', 'image14.jpg', '2024-10-01'),
('71-43-2', 'Benzene', 'mL', N'Nguyên liệu phổ biến trong sản xuất công nghiệp', 'C6H6',  N'Dễ cháy, gây ung thư khi tiếp xúc lâu dài', N'Bảo quản trong thùng kín', '2025-02-01', 'image15.jpg', '2024-10-01');


INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('110-54-3', 'Hexane', 'mL', N'Dung môi hữu cơ dễ cháy', 'C6H14', N'Dễ cháy, nguy hiểm cho hệ hô hấp', N'Sử dụng trong môi trường thông gió tốt', '2025-02-01', 'image16.jpg', '2024-10-01'),
('79-09-4', 'Propionic Acid', 'mL', N'Dung môi axit hữu cơ', 'C3H6O2', N'Có thể gây bỏng da khi tiếp xúc', N'Mang đồ bảo hộ và rửa kỹ sau khi tiếp xúc', '2025-02-01', 'image17.jpg', '2024-10-01'),
('64-18-6', 'Formic Acid', 'mL', N'Axit hữu cơ mạnh, dễ bay hơi', 'CH2O2', N'Nguy hiểm nếu nuốt hoặc hít phải', N'Sử dụng kính và khẩu trang bảo hộ', '2025-02-01', 'image18.jpg', '2024-10-01'),
('141-43-5', 'Ethanolamine', 'mL', N'Chất dùng trong công nghiệp hóa chất', 'C2H7NO', N'Có thể gây kích ứng mắt và da', N'Deo kính và găng tay khi sử dụng', '2025-02-01', 'image19.jpg', '2024-10-01'),
('108-88-3', 'Toluene', 'mL', N'Dung môi hữu cơ dễ cháy', 'C7H8',   N'Độc hại khi hít phải, nguy hiểm nếu tiếp xúc lâu dài', N'Deo khẩu trang và kính bảo hộ', '2025-02-01', 'image20.jpg', '2024-10-01'),
('75-21-8', 'Ethylene Oxide', 'g', N'Hóa chất dễ bay hơi dùng trong công nghiệp', 'C2H4O', N'Nguy hiểm khi hít phải, dễ cháy', N'Sử dụng trong môi trường thông thoáng, tránh lửa', '2025-02-01', 'image21.jpg', '2024-10-01'),
('109-99-9', 'Tetrahydrofuran', 'mL', N'Dung môi hữu cơ được sử dụng rộng rãi', 'C4H8O', N'Dễ cháy, có thể gây kích ứng mắt', N'Sử dụng kính bảo hộ và làm việc xa nguồn nhiệt', '2025-02-01', 'image22.jpg', '2024-10-01'),
('67-64-1', 'Acetone', 'mL', N'Dung môi công nghiệp phổ biến', 'C3H6O', N'Nguy hiểm khi hít phải hoặc tiếp xúc lâu dài',  N'Làm việc trong môi trường thông gió tốt', '2025-02-01', 'image23.jpg', '2024-10-01'),
('108-05-4', 'Vinyl Acetate', 'mL', N'Dùng trong sản xuất nhựa tổng hợp', 'C4H6O2', N'Dễ cháy, có thể gây kích ứng da', N'Deo găng tay và kính bảo hộ khi sử dụng', '2025-02-01', 'image24.jpg', '2024-10-01'),
('75-09-2', 'Dichloromethane', 'mL', N'Dung môi hữu cơ không cháy', 'CH2Cl2', N'Có thể gây độc khi tiếp xúc hoặc hít phải',N'Sử dụng trong môi trường thoáng khí', '2025-02-01', 'image25.jpg', '2024-10-01');

INSERT INTO HoaChat (SoCAS, TenHoaChat, DonVi, MoTa, CongThucHoaHoc, NguyHiem, SoLieuAnToan, ThoiHanSuDung, HinhAnh, NgayTao)
VALUES
('107-13-1', 'Acrylonitrile', 'mL', N'Chất dùng trong sản xuất sợi tổng hợp', 'C3H3N',  N'Nguy hiểm khi tiếp xúc lâu dài, dễ cháy', N'Deo kính bảo hộ và làm việc xa nguồn nhiệt', '2025-02-01', 'image27.jpg', '2024-10-01'),
('71-36-3', 'n-Butanol', 'mL', N'Dung môi hữu cơ phổ biến trong công nghiệp', 'C4H10O', N'Dễ cháy, gây kích ứng nếu tiếp xúc với mắt', N'Sử dụng trong môi trường thông gió tốt', '2025-02-01', 'image28.jpg', '2024-10-01'),
('123-72-8', 'Butanal', 'mL', N'Dung môi hữu cơ trong tổng hợp hóa học', 'C4H8O', N'Nguy hiểm khi hít phải hoặc tiếp xúc lâu dài', N'Deo khẩu trang và găng tay khi làm việc', '2025-02-01', 'image29.jpg', '2024-10-01'),
('110-82-7', 'Cyclohexane', 'mL', N'Dùng trong sản xuất nylon và nhựa', 'C6H12', N'Dễ cháy, gây kích ứng da nếu tiếp xúc', N'Bảo quản nơi thoáng mát, tránh xa nguồn nhiệt', '2025-02-01', 'image30.jpg', '2024-10-01'),
('67-66-3', 'Chloroform', 'mL', N'Dung môi không cháy nhưng độc hại', 'CHCl3', N'Gây nguy hiểm cho hệ thần kinh nếu tiếp xúc lâu dài', N'Sử dụng kính bảo hộ và làm việc trong môi trường thoáng khí', '2025-02-01', 'image31.jpg', '2024-10-01'),
('106-46-7', '1,4-Dichlorobenzene', 'g', N'Dùng trong sản xuất thuốc diệt côn trùng', 'C6H4Cl2', N'Nguy hiểm nếu hít phải hoặc nuốt phải', N'Deo găng tay và kính bảo hộ khi làm việc', '2025-02-01', 'image32.jpg', '2024-10-01'),
('75-44-5', 'Phosgene', 'g',  N'Hóa chất độc hại dùng trong sản xuất nhựa', 'COCl2', N'Cực kỳ nguy hiểm nếu tiếp xúc hoặc hít phải', N'Sử dụng thiết bị bảo hộ toàn thân', '2025-02-01', 'image33.jpg', '2024-10-01'),
('108-24-7', 'Acetic Anhydride', 'mL', N'Dùng trong tổng hợp hóa chất', 'C4H6O3', N'Có thể gây bỏng da hoặc mắt', N'Deo kính bảo hộ và làm việc trong môi trường thông thoáng', '2025-02-01', 'image34.jpg', '2024-10-01'),
('110-00-9', 'Furan', 'mL', N'Hợp chất hữu cơ dùng trong công nghiệp', 'C4H4O',  N'Dễ cháy, có thể gây nguy hiểm cho hệ thần kinh', N'Deo kính và làm việc trong môi trường thông gió tốt', '2025-02-01', 'image35.jpg', '2024-10-01');



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
(100, '2024-07-01', N'Nhập hàng đợt 1', 3),
(150, '2024-07-02', N'Nhập hàng đợt 2', 4),
(200, '2024-07-03', N'Nhập hàng đợt 3', 5),
(120, '2024-07-04', N'Nhập hàng đợt 4', 3),
(130, '2024-07-05', N'Nhập hàng đợt 5', 5),
(180, '2024-07-06', N'Nhập hàng đợt 6', 3),
(110, '2024-07-07', N'Nhập hàng đợt 7', 8),
(160, '2024-07-08', N'Nhập hàng đợt 8', 8),
(140, '2024-07-09', N'Nhập hàng đợt 9', 8),
(170, '2024-07-10', N'Nhập hàng đợt 10', 5);

--LoHoaChat (SoLo, NhaCungCap, HanSuDung, TrangThai, SoLuongTon, GhiChu, MaHoaChat, MaPhieuTL, MaPhieuNhap)
INSERT INTO LoHoaChat (SoLo, NhaCungCap, SoLuong, HanSuDung, TrangThai, SoLuongTon, GhiChu, MaHoaChat, MaPhieuTL, MaPhieuNhap)
VALUES
('LOT-66-71-7-001',N'Công ty Cổ phần Hóa chất TPHCM', 100,'2026-12-31', N'Đang sử dụng', 80, N'Lô nhập tháng 10', 1, 1, 1),
('LOT-123-91-1-001',N'Công ty TNHH Thương mại Dịch vụ Xuất Nhập khẩu Khánh An Sài Gòn', 50,'2026-12-31', N'Đang sử dụng', 50, N'Lô nhập tháng 10', 2, NULL, 2),
('LOT-123-91-1-002',N'Công ty TNHH Thương mại Dịch vụ Xuất Nhập khẩu Khánh An Sài Gòn', 100,'2026-12-31', N'Đang sử dụng', 100, N'Lô nhập tháng 10', 1, NULL, 2),
('LOT-130-23-4-001',N'Công ty TNHH Hóa chất Thành Phương',200, '2026-12-31', N'Đang sử dụng', 100, N'Lô nhập tháng 10', 3, NULL, 3),
('LOT-62-53-3-003',N'Công ty Cổ phần Đầu tư Phát triển Lộc Thiên',60, '2026-12-31', N'Đang sử dụng', 40, N'Lô nhập tháng 10', 4, NULL, 4),
('LOT-62-53-3-001',N'Công ty Cổ phần Đầu tư Phát triển Lộc Thiên', 60,'2026-12-31', N'Đang sử dụng', 40, N'Lô nhập tháng 10', 6, NULL, 4),
('LOT-76-72-7-001',N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 60,'2026-12-31', N'Hết hạn sử dụng', 30, N'Lô nhập tháng 10', 1, 2, 6),
('LOT-69-72-7-003',N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 70,'2026-12-31', N'Đang sử dụng', 60, N'Lô nhập tháng 10', 5, 3, 5),
('LOT-69-72-7-002',N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 60,'2026-12-31', N'Đang sử dụng', 60, N'Lô nhập tháng 10', 1, 3, 5);

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

--====================================================PROCEDURE

CREATE PROCEDURE [dbo].[GetPhieuThanhLyDetails]
AS
BEGIN
    SELECT 
        p.MaPhieuTL,
        p.LyDo,
        p.TrangThai,
        p.PhuongThucThanhLy,
        p.NgayTao,
        p.MaNguoiDung,
        u.TenDangNhap AS NguoiDung_TenDangNhap,
        u.Email AS NguoiDung_Email,
        lh.MaLo,
        lh.NhaCungCap,
        lh.SoLuong,
				lh.SoLuongTon,
		lh.GhiChu,
        lh.HanSuDung,
        lh.TrangThai AS LoTrangThai,
        hc.TenHoaChat,
			hc.DonVi,
		hc.CongThucHoaHoc,
		hc.HinhAnh,
		hc.MoTa,
		hc.NguyHiem,
		hc.SoLieuAnToan,
	
		dh.NgayDuyet,
        lh.SoLo AS HoaChatSoLo,
        hc.SoCAS AS HoaChatSoCAS,
        dh.MaNguoiDung AS DuyetPhieuTL_MaNguoiDung,
        dh.NgayDuyet AS DuyetPhieuTL_NgayDuyet,
        dh.TrangThai AS DuyetPhieuTL_TrangThai
    FROM PhieuThanhLy p
    INNER JOIN NguoiDung u ON p.MaNguoiDung = u.MaNguoiDung
    LEFT JOIN LoHoaChat lh ON lh.MaPhieuTL = p.MaPhieuTL
    LEFT JOIN HoaChat hc ON lh.MaHoaChat = hc.MaHoaChat
    LEFT JOIN DuyetPhieuTL dh ON p.MaPhieuTL = dh.MaPhieuTL
    ORDER BY p.NgayTao DESC
END
GO

GO
CREATE PROCEDURE [dbo].[GetChemicalDetailsInPhieuThanhLy]
    @MaPhieuTL INT
AS
BEGIN
    -- Lấy thông tin về Phiếu Thanh Lý
    SELECT 
        pt.MaPhieuTL,
        pt.LyDo,
        pt.TrangThai,
        pt.PhuongThucThanhLy,
        pt.NgayTao AS NgayTaoPhieuTL,
        pt.MaNguoiDung,
        nd.TenDangNhap AS TenNguoiDung
    FROM dbo.PhieuThanhLy pt
    JOIN dbo.NguoiDung nd ON pt.MaNguoiDung = nd.MaNguoiDung
    WHERE pt.MaPhieuTL = @MaPhieuTL;

    -- Lấy thông tin về các hóa chất trong phiếu thanh lý
    SELECT 
        hc.MaHoaChat,
        hc.TenHoaChat,
        hc.SoCAS,
        hc.DonVi,
        hc.MoTa,
        hc.CongThucHoaHoc,
        hc.NguyHiem,
        hc.SoLieuAnToan,
        hc.ThoiHanSuDung,
        hc.HinhAnh,
        hc.NgayTao AS NgayTaoHoaChat
    FROM dbo.HoaChat hc
    INNER JOIN dbo.LoHoaChat lh ON hc.MaHoaChat = lh.MaHoaChat
    WHERE lh.MaPhieuTL = @MaPhieuTL;
END;
GO


Create  PROCEDURE [dbo].[GetPhieuThanhLyDetailsChiTiet]
    @MaPhieuTL INT
AS
BEGIN
    -- Lấy thông tin về Phiếu Thanh Lý
    SELECT 
        p.MaPhieuTL,
        p.LyDo,
        p.TrangThai,
        p.PhuongThucThanhLy,
        p.NgayTao,
        p.MaNguoiDung,
        u.TenDangNhap AS NguoiDung_TenDangNhap,
        u.Email AS NguoiDung_Email,
        lh.MaLo,
        lh.NhaCungCap,
        lh.SoLuong,
		lh.SoLuongTon,
		lh.GhiChu,
        lh.HanSuDung,
        lh.TrangThai AS LoTrangThai,
        hc.TenHoaChat,
		hc.DonVi,
		hc.CongThucHoaHoc,
		hc.HinhAnh,
		hc.MoTa,
		hc.NguyHiem,
		hc.SoLieuAnToan,
	
		dh.NgayDuyet,
		
        lh.SoLo AS HoaChatSoLo,
        hc.SoCAS AS HoaChatSoCAS,
        dh.MaNguoiDung AS DuyetPhieuTL_MaNguoiDung,
        dh.NgayDuyet AS DuyetPhieuTL_NgayDuyet,
        dh.TrangThai AS DuyetPhieuTL_TrangThai
    FROM PhieuThanhLy p
    INNER JOIN NguoiDung u ON p.MaNguoiDung = u.MaNguoiDung
    LEFT JOIN LoHoaChat lh ON lh.MaPhieuTL = p.MaPhieuTL
    LEFT JOIN HoaChat hc ON lh.MaHoaChat = hc.MaHoaChat
    LEFT JOIN DuyetPhieuTL dh ON p.MaPhieuTL = dh.MaPhieuTL
    WHERE p.MaPhieuTL = @MaPhieuTL
    ORDER BY p.NgayTao DESC;
END
GO

--PROC & TRIGGER KHANG
CREATE TRIGGER UpdateSoLuongTon
ON ChiTietPhanBo
AFTER INSERT
AS
BEGIN
    -- Declare variables to hold the inserted values
    DECLARE @MaLo INT;
    DECLARE @SoLuong INT;

    -- Get the values from the inserted row in ChiTietPhanBo
    SELECT @MaLo = MaLo, @SoLuong = SoLuong
    FROM INSERTED;

    -- Update the SoLuongTon in LoHoaChat
    UPDATE LoHoaChat
    SET SoLuongTon = SoLuongTon - @SoLuong
    WHERE MaLo = @MaLo;
END;

GO
CREATE PROCEDURE GetMaxQuantityLotByChemicalName
    @TenHoaChat NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1 
        Lo.MaLo, 
        Lo.SoLuongTon, 
        Lo.MaPhieuTL
    FROM LoHoaChat AS Lo
    INNER JOIN HoaChat AS HC ON Lo.MaHoaChat = HC.MaHoaChat
    WHERE HC.TenHoaChat = @TenHoaChat
      AND Lo.MaPhieuTL IS NULL
    ORDER BY Lo.SoLuongTon DESC;
END;
--EXEC GetMaxQuantityLotByChemicalName @TenHoaChat = N'1,10-Phenanthroline';
