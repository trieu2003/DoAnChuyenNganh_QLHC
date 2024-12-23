USE [QLHC_NHOM95]
GO
/****** Object:  Table [dbo].[BaiThiNghiem]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BaiThiNghiem](
	[MaBaiTN] [int] IDENTITY(1,1) NOT NULL,
	[TenBaiTN] [nvarchar](255) NOT NULL,
	[MaMon] [int] NOT NULL,
	[TrangThai] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaBaiTN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietDeXuat]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietDeXuat](
	[MaPhieuDX] [int] NOT NULL,
	[MaHoaChat] [int] NOT NULL,
	[SoLuong] [int] NOT NULL,
	[DonGia] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuDX] ASC,
	[MaHoaChat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietPhanBo]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietPhanBo](
	[MaPhieuPB] [int] NOT NULL,
	[MaLo] [int] NOT NULL,
	[SoLuong] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuPB] ASC,
	[MaLo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DuTru]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DuTru](
	[MaHoaChat] [int] NOT NULL,
	[MaBaiTN] [int] NOT NULL,
	[SoLuong] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHoaChat] ASC,
	[MaBaiTN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DuyetDuTru]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DuyetDuTru](
	[MaLichSu] [int] IDENTITY(1,1) NOT NULL,
	[MaBaiTN] [int] NOT NULL,
	[MaNguoiDung] [int] NOT NULL,
	[NgayDuyet] [datetime] NOT NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
	[LyDoTuChoi] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichSu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DuyetPhieuDX]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DuyetPhieuDX](
	[MaLichSu] [int] IDENTITY(1,1) NOT NULL,
	[MaPhieuDX] [int] NOT NULL,
	[MaNguoiDung] [int] NOT NULL,
	[NgayDuyet] [datetime] NOT NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
	[LyDoTuChoi] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichSu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DuyetPhieuTL]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DuyetPhieuTL](
	[MaLichSu] [int] IDENTITY(1,1) NOT NULL,
	[MaPhieuTL] [int] NOT NULL,
	[MaNguoiDung] [int] NOT NULL,
	[NgayDuyet] [datetime] NOT NULL,
	[TrangThai] [nvarchar](50) NULL,
	[LyDoTuChoi] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLichSu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaChat]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaChat](
	[MaHoaChat] [int] IDENTITY(1,1) NOT NULL,
	[SoCAS] [nvarchar](50) NOT NULL,
	[TenHoaChat] [nvarchar](255) NOT NULL,
	[DonVi] [nvarchar](50) NOT NULL,
	[MoTa] [nvarchar](255) NULL,
	[CongThucHoaHoc] [nvarchar](255) NULL,
	[NguyHiem] [nvarchar](255) NULL,
	[SoLieuAnToan] [nvarchar](255) NULL,
	[ThoiHanSuDung] [date] NULL,
	[HinhAnh] [nvarchar](255) NULL,
	[NgayTao] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaHoaChat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoHoaChat]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoHoaChat](
	[MaLo] [int] IDENTITY(1,1) NOT NULL,
	[SoLo] [varchar](20) NOT NULL,
	[NhaCungCap] [nvarchar](255) NULL,
	[SoLuong] [int] NOT NULL,
	[HanSuDung] [date] NOT NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
	[SoLuongTon] [int] NOT NULL,
	[GhiChu] [nvarchar](255) NULL,
	[MaHoaChat] [int] NOT NULL,
	[MaPhieuTL] [int] NULL,
	[MaPhieuNhap] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LopHocPhan]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LopHocPhan](
	[MaLHP] [int] IDENTITY(1,1) NOT NULL,
	[TenLopHocPhan] [varchar](15) NULL,
	[SiSo] [int] NOT NULL,
	[GVDay] [nvarchar](100) NULL,
	[MaMon] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaLHP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonHoc]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonHoc](
	[MaMon] [int] IDENTITY(1,1) NOT NULL,
	[TenMon] [nvarchar](255) NOT NULL,
	[SoTC] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaMon] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NguoiDung]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDung](
	[MaNguoiDung] [int] IDENTITY(1,1) NOT NULL,
	[TenDangNhap] [nvarchar](50) NOT NULL,
	[TenNguoiDung] [nvarchar](255) NULL,
	[MatKhauHash] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[VaiTro] [nvarchar](50) NULL,
	[NgayTao] [date] NOT NULL,
	[HinhAnh] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNguoiDung] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhieuDeXuat]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuDeXuat](
	[MaPhieuDX] [int] IDENTITY(1,1) NOT NULL,
	[LyDo] [nvarchar](255) NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
	[NgayTao] [datetime] NOT NULL,
	[MaNguoiDung] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuDX] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhieuNhap]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuNhap](
	[MaPhieuNhap] [int] IDENTITY(1,1) NOT NULL,
	[SoLuongNhap] [int] NOT NULL,
	[NgayNhap] [datetime] NOT NULL,
	[GhiChu] [nvarchar](255) NULL,
	[MaNguoiDung] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuNhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhieuPhanBo]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuPhanBo](
	[MaPhieuPB] [int] IDENTITY(1,1) NOT NULL,
	[NgayLap] [datetime] NOT NULL,
	[NoiDung] [nvarchar](255) NULL,
	[MaLHP] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuPB] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhieuThanhLy]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhieuThanhLy](
	[MaPhieuTL] [int] IDENTITY(1,1) NOT NULL,
	[LyDo] [nvarchar](255) NULL,
	[TrangThai] [nvarchar](50) NOT NULL,
	[PhuongThucThanhLy] [nvarchar](50) NULL,
	[NgayTao] [datetime] NOT NULL,
	[MaNguoiDung] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaPhieuTL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BaiThiNghiem] ON 

INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (1, N'Thí nghiệm 1 Hóa đại cương', 1, N'Đã duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (2, N'Thí nghiệm 1 Vật lý hóa học', 2, N'Đã duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (3, N'Thí nghiệm 1 Hóa phân tích', 3, N'Đã duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (4, N'Thí nghiệm 1 Sinh hóa học', 4, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (5, N'Thí nghiệm 1 Kỹ thuật an toàn hóa chất', 5, N'Đã duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (6, N'Thí nghiệm 1 Quản lý môi trường trong phòng thí nghiệm', 6, N'Từ chối')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (7, N'Thí nghiệm 1 Công nghệ hóa học', 7, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (8, N'Thí nghiệm 1 Pháp chế hóa chất', 8, N'Đã duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (9, N'Thí nghiệm 1 Ứng dụng hóa chất trong công nghiệp', 9, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (10, N'Thí nghiệm 1 Thực hành thí nghiệm hóa học', 10, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (11, N'TN 2', 6, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (12, N'TN3', 6, N'Chờ duyệt')
INSERT [dbo].[BaiThiNghiem] ([MaBaiTN], [TenBaiTN], [MaMon], [TrangThai]) VALUES (13, N'TN 3', 1, N'Đã duyệt')
SET IDENTITY_INSERT [dbo].[BaiThiNghiem] OFF
GO
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (1, 1, 10, CAST(10000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (2, 2, 15, CAST(15000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (3, 3, 20, CAST(20000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (4, 4, 12, CAST(12000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (5, 5, 13, CAST(13000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (6, 6, 18, CAST(18000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (7, 7, 11, CAST(11000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (8, 8, 16, CAST(16000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (9, 9, 14, CAST(14000.00 AS Decimal(18, 2)))
INSERT [dbo].[ChiTietDeXuat] ([MaPhieuDX], [MaHoaChat], [SoLuong], [DonGia]) VALUES (10, 10, 17, CAST(17000.00 AS Decimal(18, 2)))
GO
INSERT [dbo].[ChiTietPhanBo] ([MaPhieuPB], [MaLo], [SoLuong]) VALUES (1, 1, 10)
INSERT [dbo].[ChiTietPhanBo] ([MaPhieuPB], [MaLo], [SoLuong]) VALUES (2, 2, 15)
INSERT [dbo].[ChiTietPhanBo] ([MaPhieuPB], [MaLo], [SoLuong]) VALUES (3, 3, 20)
GO
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (1, 1, 10)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (1, 13, 100)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (2, 2, 15)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (2, 12, 200)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (3, 3, 20)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (4, 4, 12)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (5, 5, 13)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (6, 6, 18)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (7, 7, 11)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (8, 8, 16)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (9, 9, 14)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (10, 10, 17)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (21, 11, 100)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (21, 12, 100)
INSERT [dbo].[DuTru] ([MaHoaChat], [MaBaiTN], [SoLuong]) VALUES (25, 11, 1000)
GO
SET IDENTITY_INSERT [dbo].[DuyetDuTru] ON 

INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (1, 1, 3, CAST(N'2024-12-12T10:30:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (2, 2, 4, CAST(N'2024-12-12T11:15:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (3, 3, 3, CAST(N'2024-12-12T14:45:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (4, 8, 4, CAST(N'2024-12-19T08:13:33.850' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (5, 5, 4, CAST(N'2024-12-19T08:15:12.383' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (6, 6, 4, CAST(N'2024-12-19T08:17:05.880' AS DateTime), N'Từ chối', N'Dư thừa')
INSERT [dbo].[DuyetDuTru] ([MaLichSu], [MaBaiTN], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (7, 13, 3, CAST(N'2024-12-19T10:50:11.170' AS DateTime), N'Đã duyệt', NULL)
SET IDENTITY_INSERT [dbo].[DuyetDuTru] OFF
GO
SET IDENTITY_INSERT [dbo].[DuyetPhieuDX] ON 

INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (1, 1, 1, CAST(N'2024-06-01T10:00:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (2, 3, 2, CAST(N'2024-06-03T11:30:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (3, 5, 2, CAST(N'2024-06-05T14:00:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (4, 7, 1, CAST(N'2024-06-07T15:00:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (5, 9, 2, CAST(N'2024-06-09T16:00:00.000' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (6, 10, 2, CAST(N'2024-06-10T17:30:00.000' AS DateTime), N'Từ Chối', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (7, 2, 1, CAST(N'2024-12-18T16:04:38.047' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuDX] ([MaLichSu], [MaPhieuDX], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (8, 4, 1, CAST(N'2024-12-18T16:05:17.300' AS DateTime), N'Từ chối', N'test')
SET IDENTITY_INSERT [dbo].[DuyetPhieuDX] OFF
GO
SET IDENTITY_INSERT [dbo].[DuyetPhieuTL] ON 

INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (1, 1, 2, CAST(N'2024-11-25T00:00:00.000' AS DateTime), N'Chờ duyệt', NULL)
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (2, 2, 2, CAST(N'2024-11-26T00:00:00.000' AS DateTime), N'Chờ duyệt', NULL)
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (3, 3, 1, CAST(N'2024-11-27T00:00:00.000' AS DateTime), N'Chờ duyệt', NULL)
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (4, 1, 1, CAST(N'2024-12-19T09:40:28.197' AS DateTime), N'Đã duyệt', NULL)
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (5, 3, 3, CAST(N'2024-12-19T09:40:49.510' AS DateTime), N'Đã từ chối', N'Chưa cần thiết')
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (6, 4, 3, CAST(N'2024-12-19T10:37:11.070' AS DateTime), N'Đã từ chối', N'chưa đến hạn tiêu huỷ')
INSERT [dbo].[DuyetPhieuTL] ([MaLichSu], [MaPhieuTL], [MaNguoiDung], [NgayDuyet], [TrangThai], [LyDoTuChoi]) VALUES (17, 18, 1, CAST(N'2024-12-22T00:00:00.000' AS DateTime), N'Đã duyệt', N'Thanh lý tự động lô hóa chất đã hết hạn')
SET IDENTITY_INSERT [dbo].[DuyetPhieuTL] OFF
GO
SET IDENTITY_INSERT [dbo].[HoaChat] ON 

INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (1, N'66-71-7', N'1,10-Phenanthroline', N'g', N'Hợp chất hữu cơ được sử dụng trong phân tích hóa học', N'C12H8N2', N'Nguy hiểm khi hít phải hoặc tiếp xúc với da', N'Mang khẩu trang và găng tay khi xử lý', CAST(N'2025-01-01' AS Date), N'image1.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (2, N'123-91-1', N'1,4-Dioxane', N'mL', N'Dung môi hữu cơ dùng trong tổng hợp hóa học', N'C4H8O2', N'Dễ cháy, có thể gây kích ứng đường hô hấp', N'Làm việc trong môi trường thông thoáng, tránh lửa', CAST(N'2025-01-01' AS Date), N'image2.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (3, N'130-23-4', N'1-amino-2 naphtol-4 sunfonic acid', N'g', N'Chất màu dùng trong nghiên cứu hóa học', N'C10H9NO4S', N'Tiếp xúc lâu dài có thể gây tổn thương nội tạng', N'Sử dụng kính bảo hộ và mặt nạ', CAST(N'2025-01-01' AS Date), N'image3.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (4, N'62-53-3', N'Aniline', N'mL', N'Dung môi phổ biến trong phòng thí nghiệm', N'C6H5NH2', N'Độc hại khi uống, nguy hiểm khi hít phải', N'Không ăn uống hoặc hút thuốc khi sử dụng', CAST(N'2025-01-01' AS Date), N'image4.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (5, N'69-72-7', N'Salicylic Acid', N'g', N'Chất sử dụng trong dược phẩm và mỹ phẩm', N'C7H6O3', N'Gây kích ứng mắt và da, có thể gây dị ứng', N'Rửa sạch bằng nước sau khi tiếp xúc', CAST(N'2025-01-01' AS Date), N'image5.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (6, N'51-28-5', N'2,4-Dinitrophenyl hydrazin', N'g', N'Hợp chất hữu cơ dễ cháy dùng trong phân tích', N'C6H6N4O4', N'Dễ cháy, độc hại nếu hít phải', N'Bảo quản tránh xa nhiệt và lửa', CAST(N'2025-02-01' AS Date), N'image6.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (7, N'88-85-7', N'2,4-Dichlorophenoxyacetic acid', N'g', N'Hóa chất dùng trong bảo vệ thực vật', N'C8H6Cl2O3', N'Nguy hiểm cho môi trường nước', N'Sử dụng đồ bảo hộ khi làm việc', CAST(N'2025-02-01' AS Date), N'image7.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (8, N'133-07-3', N'2,6-Dichloroquinone-4-Chloroimide', N'g', N'Hóa chất dùng trong thử nghiệm màu sắc', N'C6H2Cl3NO', N'Có thể gây kích ứng mạnh khi tiếp xúc', N'Deo găng tay và kính bảo hộ', CAST(N'2025-02-01' AS Date), N'image8.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (9, N'50-00-0', N'Formaldehyde', N'mL', N'Dùng trong sản xuất nhựa và chất dẻo', N'CH2O', N'Cực độc, nguy hiểm khi hít phải', N'Sử dụng trong không gian thoáng khí', CAST(N'2025-02-01' AS Date), N'image9.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (10, N'67-56-1', N'Methanol', N'mL', N'Dung môi phổ biến trong công nghiệp hóa chất', N'CH3OH', N'Nguy hiểm nếu uống phải, dễ cháy', N'Tránh xa nguồn lửa và không uống phải', CAST(N'2025-02-01' AS Date), N'image10.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (11, N'64-19-7', N'Acetic Acid', N'mL', N'Dung môi axit phổ biến trong phòng thí nghiệm', N'C2H4O2', N'Gây kích ứng mạnh nếu tiếp xúc trực tiếp', N'Sử dụng trong môi trường thông thoáng', CAST(N'2025-02-01' AS Date), N'image11.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (12, N'67-63-0', N'Isopropyl Alcohol', N'mL', N'Chất tẩy rửa phổ biến trong công nghiệp', N'C3H8O', N'Nguy hiểm khi hít phải hơi cồn', N'Mang đồ bảo hộ khi làm việc', CAST(N'2025-02-01' AS Date), N'image12.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (13, N'75-65-0', N'Tert-Butanol', N'g', N'Dùng trong điều chế hóa chất hữu cơ', N'C4H10O', N'Độc hại khi tiếp xúc lâu dài', N'Bảo quản tránh nhiệt độ cao', CAST(N'2025-02-01' AS Date), N'image13.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (14, N'108-95-2', N'Phenol', N'g', N'Dùng làm nguyên liệu cho nhựa tổng hợp', N'C6H6O', N'Cực kỳ độc hại, gây bỏng nếu tiếp xúc', N'Deo kính bảo hộ và găng tay', CAST(N'2025-02-01' AS Date), N'image14.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (15, N'71-43-2', N'Benzene', N'mL', N'Nguyên liệu phổ biến trong sản xuất công nghiệp', N'C6H6', N'Dễ cháy, gây ung thư khi tiếp xúc lâu dài', N'Bảo quản trong thùng kín', CAST(N'2025-02-01' AS Date), N'image15.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (16, N'110-54-3', N'Hexane', N'mL', N'Dung môi hữu cơ dễ cháy', N'C6H14', N'Dễ cháy, nguy hiểm cho hệ hô hấp', N'Sử dụng trong môi trường thông gió tốt', CAST(N'2025-02-01' AS Date), N'image16.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (17, N'79-09-4', N'Propionic Acid', N'mL', N'Dung môi axit hữu cơ', N'C3H6O2', N'Có thể gây bỏng da khi tiếp xúc', N'Mang đồ bảo hộ và rửa kỹ sau khi tiếp xúc', CAST(N'2025-02-01' AS Date), N'image17.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (18, N'64-18-6', N'Formic Acid', N'mL', N'Axit hữu cơ mạnh, dễ bay hơi', N'CH2O2', N'Nguy hiểm nếu nuốt hoặc hít phải', N'Sử dụng kính và khẩu trang bảo hộ', CAST(N'2025-02-01' AS Date), N'image18.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (19, N'141-43-5', N'Ethanolamine', N'mL', N'Chất dùng trong công nghiệp hóa chất', N'C2H7NO', N'Có thể gây kích ứng mắt và da', N'Deo kính và găng tay khi sử dụng', CAST(N'2025-02-01' AS Date), N'image19.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (20, N'108-88-3', N'Toluene', N'mL', N'Dung môi hữu cơ dễ cháy', N'C7H8', N'Độc hại khi hít phải, nguy hiểm nếu tiếp xúc lâu dài', N'Deo khẩu trang và kính bảo hộ', CAST(N'2025-02-01' AS Date), N'image20.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (21, N'75-21-8', N'Ethylene Oxide', N'g', N'Hóa chất dễ bay hơi dùng trong công nghiệp', N'C2H4O', N'Nguy hiểm khi hít phải, dễ cháy', N'Sử dụng trong môi trường thông thoáng, tránh lửa', CAST(N'2025-02-01' AS Date), N'image21.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (22, N'109-99-9', N'Tetrahydrofuran', N'mL', N'Dung môi hữu cơ được sử dụng rộng rãi', N'C4H8O', N'Dễ cháy, có thể gây kích ứng mắt', N'Sử dụng kính bảo hộ và làm việc xa nguồn nhiệt', CAST(N'2025-02-01' AS Date), N'image22.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (23, N'67-64-1', N'Acetone', N'mL', N'Dung môi công nghiệp phổ biến', N'C3H6O', N'Nguy hiểm khi hít phải hoặc tiếp xúc lâu dài', N'Làm việc trong môi trường thông gió tốt', CAST(N'2025-02-01' AS Date), N'image23.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (24, N'108-05-4', N'Vinyl Acetate', N'mL', N'Dùng trong sản xuất nhựa tổng hợp', N'C4H6O2', N'Dễ cháy, có thể gây kích ứng da', N'Deo găng tay và kính bảo hộ khi sử dụng', CAST(N'2025-02-01' AS Date), N'image24.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (25, N'75-09-2', N'Dichloromethane', N'mL', N'Dung môi hữu cơ không cháy', N'CH2Cl2', N'Có thể gây độc khi tiếp xúc hoặc hít phải', N'Sử dụng trong môi trường thoáng khí', CAST(N'2025-02-01' AS Date), N'image25.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (26, N'107-13-1', N'Acrylonitrile', N'mL', N'Chất dùng trong sản xuất sợi tổng hợp', N'C3H3N', N'Nguy hiểm khi tiếp xúc lâu dài, dễ cháy', N'Deo kính bảo hộ và làm việc xa nguồn nhiệt', CAST(N'2025-02-01' AS Date), N'image27.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (27, N'71-36-3', N'n-Butanol', N'mL', N'Dung môi hữu cơ phổ biến trong công nghiệp', N'C4H10O', N'Dễ cháy, gây kích ứng nếu tiếp xúc với mắt', N'Sử dụng trong môi trường thông gió tốt', CAST(N'2025-02-01' AS Date), N'image28.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (28, N'123-72-8', N'Butanal', N'mL', N'Dung môi hữu cơ trong tổng hợp hóa học', N'C4H8O', N'Nguy hiểm khi hít phải hoặc tiếp xúc lâu dài', N'Deo khẩu trang và găng tay khi làm việc', CAST(N'2025-02-01' AS Date), N'image29.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (29, N'110-82-7', N'Cyclohexane', N'mL', N'Dùng trong sản xuất nylon và nhựa', N'C6H12', N'Dễ cháy, gây kích ứng da nếu tiếp xúc', N'Bảo quản nơi thoáng mát, tránh xa nguồn nhiệt', CAST(N'2025-02-01' AS Date), N'image30.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (30, N'67-66-3', N'Chloroform', N'mL', N'Dung môi không cháy nhưng độc hại', N'CHCl3', N'Gây nguy hiểm cho hệ thần kinh nếu tiếp xúc lâu dài', N'Sử dụng kính bảo hộ và làm việc trong môi trường thoáng khí', CAST(N'2025-02-01' AS Date), N'image31.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (31, N'106-46-7', N'1,4-Dichlorobenzene', N'g', N'Dùng trong sản xuất thuốc diệt côn trùng', N'C6H4Cl2', N'Nguy hiểm nếu hít phải hoặc nuốt phải', N'Deo găng tay và kính bảo hộ khi làm việc', CAST(N'2025-02-01' AS Date), N'image32.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (32, N'75-44-5', N'Phosgene', N'g', N'Hóa chất độc hại dùng trong sản xuất nhựa', N'COCl2', N'Cực kỳ nguy hiểm nếu tiếp xúc hoặc hít phải', N'Sử dụng thiết bị bảo hộ toàn thân', CAST(N'2025-02-01' AS Date), N'image33.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (33, N'108-24-7', N'Acetic Anhydride', N'mL', N'Dùng trong tổng hợp hóa chất', N'C4H6O3', N'Có thể gây bỏng da hoặc mắt', N'Deo kính bảo hộ và làm việc trong môi trường thông thoáng', CAST(N'2025-02-01' AS Date), N'image34.jpg', CAST(N'2024-10-01' AS Date))
INSERT [dbo].[HoaChat] ([MaHoaChat], [SoCAS], [TenHoaChat], [DonVi], [MoTa], [CongThucHoaHoc], [NguyHiem], [SoLieuAnToan], [ThoiHanSuDung], [HinhAnh], [NgayTao]) VALUES (34, N'110-00-9', N'Furan', N'mL', N'Hợp chất hữu cơ dùng trong công nghiệp', N'C4H4O', N'Dễ cháy, có thể gây nguy hiểm cho hệ thần kinh', N'Deo kính và làm việc trong môi trường thông gió tốt', CAST(N'2025-02-01' AS Date), N'image35.jpg', CAST(N'2024-10-01' AS Date))
SET IDENTITY_INSERT [dbo].[HoaChat] OFF
GO
SET IDENTITY_INSERT [dbo].[LoHoaChat] ON 

INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (1, N'LOT-66-71-7-001', N'Công ty Cổ phần Hóa chất TPHCM', 100, CAST(N'2026-12-31' AS Date), N'Đã thanh lý', 80, N'Lô nhập tháng 10', 1, 1, 1)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (2, N'LOT-123-91-1-001', N'Công ty TNHH Thương mại Dịch vụ Xuất Nhập khẩu Khánh An Sài Gòn', 50, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 50, N'Lô nhập tháng 10', 2, NULL, 2)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (3, N'LOT-123-91-1-002', N'Công ty TNHH Thương mại Dịch vụ Xuất Nhập khẩu Khánh An Sài Gòn', 100, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 100, N'Lô nhập tháng 10', 1, NULL, 2)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (4, N'LOT-130-23-4-001', N'Công ty TNHH Hóa chất Thành Phương', 200, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 100, N'Lô nhập tháng 10', 3, NULL, 3)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (5, N'LOT-62-53-3-003', N'Công ty Cổ phần Đầu tư Phát triển Lộc Thiên', 60, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 40, N'Lô nhập tháng 10', 4, NULL, 4)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (6, N'LOT-62-53-3-001', N'Công ty Cổ phần Đầu tư Phát triển Lộc Thiên', 60, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 40, N'Lô nhập tháng 10', 6, 4, 4)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (7, N'LOT-76-72-7-001', N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 60, CAST(N'2026-12-31' AS Date), N'Hết hạn sử dụng', 30, N'Lô nhập tháng 10', 1, 2, 6)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (8, N'LOT-69-72-7-003', N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 70, CAST(N'2026-12-31' AS Date), N'Đang sử dụng', 60, N'Lô nhập tháng 10', 5, 3, 5)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (9, N'LOT-69-72-7-002', N'Công ty Cổ phần Hóa chất Cơ bản Miền Nam', 60, CAST(N'2024-12-31' AS Date), N'Đang sử dụng', 60, N'Lô nhập tháng 10', 1, 3, 5)
INSERT [dbo].[LoHoaChat] ([MaLo], [SoLo], [NhaCungCap], [SoLuong], [HanSuDung], [TrangThai], [SoLuongTon], [GhiChu], [MaHoaChat], [MaPhieuTL], [MaPhieuNhap]) VALUES (11, N'LOT-66-27-7-007', N'Công ty Cổ phần ', 10, CAST(N'2024-10-31' AS Date), N'Đã thanh lý', 10, N'Lô nhập tháng 10', 1, 18, 1)
SET IDENTITY_INSERT [dbo].[LoHoaChat] OFF
GO
SET IDENTITY_INSERT [dbo].[LopHocPhan] ON 

INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (1, N'LOPH001', 30, N'Thầy Trần Tuấn', 1)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (2, N'LOPH002', 25, N'Thầy Bình', 2)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (3, N'LOPH003', 40, N'Cô Nhật Lệ', 3)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (4, N'LOPH004', 35, N'Thầy Dương', 4)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (5, N'LOPSH01', 20, N'Cô Ngọc Lan', 5)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (6, N'LOPSH02', 45, N'Thầy Minh Đức', 6)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (7, N'LOPSH03', 50, N'Cô Giang', 7)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (8, N'LOPSH04', 28, N'Thầy Chí Cường', 8)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (9, N'LOPSH05', 32, N'Cô Kim Hoa', 9)
INSERT [dbo].[LopHocPhan] ([MaLHP], [TenLopHocPhan], [SiSo], [GVDay], [MaMon]) VALUES (10, N'LOPSH06', 38, N'Thầy XUân Mạnh', 10)
SET IDENTITY_INSERT [dbo].[LopHocPhan] OFF
GO
SET IDENTITY_INSERT [dbo].[MonHoc] ON 

INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (1, N'Hóa đại cương', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (2, N'Vật lý hóa học', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (3, N'Hóa phân tích', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (4, N'Sinh hóa học', 2)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (5, N'Kỹ thuật an toàn hóa chất', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (6, N'Quản lý môi trường trong phòng thí nghiệm', 2)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (7, N'Công nghệ hóa học', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (8, N'Pháp chế hóa chất', 3)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (9, N'Ứng dụng hóa chất trong công nghiệp', 2)
INSERT [dbo].[MonHoc] ([MaMon], [TenMon], [SoTC]) VALUES (10, N'Thực hành thí nghiệm hóa học', 1)
SET IDENTITY_INSERT [dbo].[MonHoc] OFF
GO
SET IDENTITY_INSERT [dbo].[NguoiDung] ON 

INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (1, N'user1', N'Thanh Triệu', N'00c6ee2e21a7548de6260cf72c4f4b5b', N'user1@example.com', N'Admin', CAST(N'2024-01-01' AS Date), N'image1.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (2, N'user2', N'Tuấn Khang', N'58833651db311ba4bc11cb26b1900b0f', N'user2@example.com', N'Admin', CAST(N'2024-01-02' AS Date), N'image2.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (3, N'user3', N'Trần Tuấn', N'1a4ead8b39d17dfe89418452c9bba770', N'user3@example.com', N'Nhân viên', CAST(N'2024-01-03' AS Date), N'image3.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (4, N'user4', N'Tri Thuỷ', N'd80b0d6020798ff15e8d5416911201aa', N'user4@example.com', N'Nhân viên', CAST(N'2024-01-04' AS Date), N'image4.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (5, N'user5', N'Ngọc Lan', N'2ce8a4621b2843043725992ab2a61acc', N'user5@example.com', N'Nhân viên', CAST(N'2024-01-05' AS Date), N'image5.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (6, N'user6', N'Minh Đức', N'be796e420febda49c29e38745db3cae2', N'user6@example.com', N'Giảng viên', CAST(N'2024-01-06' AS Date), N'image6.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (7, N'user7', N'Nhật Lệ', N'6c72a0f18b5230ecc4ff7e278991e5c5', N'user7@example.com', N'Giảng viên', CAST(N'2024-01-07' AS Date), N'image7.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (8, N'user8', N'Kim Hoa', N'35e8b4b7776fc46cc10e7970935f2ca6', N'user8@example.com', N'Nhân viên', CAST(N'2024-01-08' AS Date), N'image8.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (9, N'user9', N'Chí Cường', N'1167fa03beba0659fdabc33b4620599d', N'user9@example.com', N'Giảng viên', CAST(N'2024-01-09' AS Date), N'image9.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (10, N'user10', N'Xuân Mạnh', N'00c6ee2e21a7548de6260cf72c4f4b5b', N'user10@example.com', N'Giảng viên', CAST(N'2024-01-10' AS Date), N'image10.jpg')
INSERT [dbo].[NguoiDung] ([MaNguoiDung], [TenDangNhap], [TenNguoiDung], [MatKhauHash], [Email], [VaiTro], [NgayTao], [HinhAnh]) VALUES (11, N'neww', N'Nguyễn Văn A', N'00c6ee2e21a7548de6260cf72c4f4b5b', N'shop@gmail.com', N'Nhân viên', CAST(N'2024-12-19' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[NguoiDung] OFF
GO
SET IDENTITY_INSERT [dbo].[PhieuDeXuat] ON 

INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (1, N'Cần cho thí nghiệm', N'Đã duyệt', CAST(N'2024-05-01T08:30:00.000' AS DateTime), 6)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (2, N'Cần thêm hóa chất', N'Đã duyệt', CAST(N'2024-05-02T09:00:00.000' AS DateTime), 7)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (3, N'Dự trữ', N'Đã duyệt', CAST(N'2024-05-03T10:00:00.000' AS DateTime), 6)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (4, N'Dùng cho lớp học', N'Từ chối', CAST(N'2024-05-04T14:00:00.000' AS DateTime), 6)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (5, N'Dự trữ hóa chất', N'Đã duyệt', CAST(N'2024-05-05T15:00:00.000' AS DateTime), 7)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (6, N'Cần gấp', N'Chờ duyệt', CAST(N'2024-05-06T16:30:00.000' AS DateTime), 6)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (7, N'Dùng cho thí nghiệm', N'Đã duyệt', CAST(N'2024-05-07T08:00:00.000' AS DateTime), 7)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (8, N'Bổ sung hóa chất', N'Chờ duyệt', CAST(N'2024-05-08T09:30:00.000' AS DateTime), 9)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (9, N'Cần thêm cho thí nghiệm', N'Đã duyệt', CAST(N'2024-05-09T11:15:00.000' AS DateTime), 9)
INSERT [dbo].[PhieuDeXuat] ([MaPhieuDX], [LyDo], [TrangThai], [NgayTao], [MaNguoiDung]) VALUES (10, N'Phân bổ cho lớp', N'Chờ duyệt', CAST(N'2024-05-10T14:45:00.000' AS DateTime), 10)
SET IDENTITY_INSERT [dbo].[PhieuDeXuat] OFF
GO
SET IDENTITY_INSERT [dbo].[PhieuNhap] ON 

INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (1, 100, CAST(N'2024-07-01T08:00:00.000' AS DateTime), N'Nhập hàng đợt 1', 3)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (2, 150, CAST(N'2024-07-02T09:00:00.000' AS DateTime), N'Nhập hàng đợt 2', 4)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (3, 200, CAST(N'2024-07-03T10:00:00.000' AS DateTime), N'Nhập hàng đợt 3', 5)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (4, 120, CAST(N'2024-07-04T11:00:00.000' AS DateTime), N'Nhập hàng đợt 4', 3)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (5, 130, CAST(N'2024-07-05T12:00:00.000' AS DateTime), N'Nhập hàng đợt 5', 5)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (6, 180, CAST(N'2024-07-06T13:00:00.000' AS DateTime), N'Nhập hàng đợt 6', 3)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (7, 110, CAST(N'2024-07-07T14:00:00.000' AS DateTime), N'Nhập hàng đợt 7', 8)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (8, 160, CAST(N'2024-07-08T15:00:00.000' AS DateTime), N'Nhập hàng đợt 8', 8)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (9, 140, CAST(N'2024-07-09T16:00:00.000' AS DateTime), N'Nhập hàng đợt 9', 8)
INSERT [dbo].[PhieuNhap] ([MaPhieuNhap], [SoLuongNhap], [NgayNhap], [GhiChu], [MaNguoiDung]) VALUES (10, 170, CAST(N'2024-07-10T17:00:00.000' AS DateTime), N'Nhập hàng đợt 10', 5)
SET IDENTITY_INSERT [dbo].[PhieuNhap] OFF
GO
SET IDENTITY_INSERT [dbo].[PhieuPhanBo] ON 

INSERT [dbo].[PhieuPhanBo] ([MaPhieuPB], [NgayLap], [NoiDung], [MaLHP]) VALUES (1, CAST(N'2024-04-01T08:00:00.000' AS DateTime), N'Phân bổ hóa chất', 1)
INSERT [dbo].[PhieuPhanBo] ([MaPhieuPB], [NgayLap], [NoiDung], [MaLHP]) VALUES (2, CAST(N'2024-04-02T09:30:00.000' AS DateTime), N'Phân bổ hóa chất', 2)
INSERT [dbo].[PhieuPhanBo] ([MaPhieuPB], [NgayLap], [NoiDung], [MaLHP]) VALUES (3, CAST(N'2024-04-03T10:15:00.000' AS DateTime), N'Phân bổ hóa chất', 3)
SET IDENTITY_INSERT [dbo].[PhieuPhanBo] OFF
GO
SET IDENTITY_INSERT [dbo].[PhieuThanhLy] ON 

INSERT [dbo].[PhieuThanhLy] ([MaPhieuTL], [LyDo], [TrangThai], [PhuongThucThanhLy], [NgayTao], [MaNguoiDung]) VALUES (1, N'Lý do thanh lý hóa chất cũ', N'Đã duyệt thanh lý', N'Bán', CAST(N'2024-11-24T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[PhieuThanhLy] ([MaPhieuTL], [LyDo], [TrangThai], [PhuongThucThanhLy], [NgayTao], [MaNguoiDung]) VALUES (2, N'Hóa chất hết hạn sử dụng', N'Chờ duyệt', N'Hủy', CAST(N'2024-11-25T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[PhieuThanhLy] ([MaPhieuTL], [LyDo], [TrangThai], [PhuongThucThanhLy], [NgayTao], [MaNguoiDung]) VALUES (3, N'Thanh lý do không cần thiết nữa', N'Đã từ chối', N'Bán', CAST(N'2024-11-26T00:00:00.000' AS DateTime), 3)
INSERT [dbo].[PhieuThanhLy] ([MaPhieuTL], [LyDo], [TrangThai], [PhuongThucThanhLy], [NgayTao], [MaNguoiDung]) VALUES (4, N'huỷ hoá  chất không còn sử dụng', N'Đã từ chối', N'tiêu huỷ', CAST(N'2024-12-19T03:36:11.657' AS DateTime), 3)
INSERT [dbo].[PhieuThanhLy] ([MaPhieuTL], [LyDo], [TrangThai], [PhuongThucThanhLy], [NgayTao], [MaNguoiDung]) VALUES (18, N'Thanh lý hóa chất hết hạn', N'Đã duyệt', N'Tự động', CAST(N'2024-12-22T00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[PhieuThanhLy] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__HoaChat__23A59A9568B61FB5]    Script Date: 12/23/2024 12:57:21 PM ******/
ALTER TABLE [dbo].[HoaChat] ADD UNIQUE NONCLUSTERED 
(
	[SoCAS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__NguoiDun__55F68FC0819D5A73]    Script Date: 12/23/2024 12:57:21 PM ******/
ALTER TABLE [dbo].[NguoiDung] ADD UNIQUE NONCLUSTERED 
(
	[TenDangNhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__NguoiDun__A9D105343E255FC1]    Script Date: 12/23/2024 12:57:21 PM ******/
ALTER TABLE [dbo].[NguoiDung] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BaiThiNghiem]  WITH CHECK ADD FOREIGN KEY([MaMon])
REFERENCES [dbo].[MonHoc] ([MaMon])
GO
ALTER TABLE [dbo].[ChiTietDeXuat]  WITH CHECK ADD FOREIGN KEY([MaHoaChat])
REFERENCES [dbo].[HoaChat] ([MaHoaChat])
GO
ALTER TABLE [dbo].[ChiTietDeXuat]  WITH CHECK ADD FOREIGN KEY([MaPhieuDX])
REFERENCES [dbo].[PhieuDeXuat] ([MaPhieuDX])
GO
ALTER TABLE [dbo].[ChiTietPhanBo]  WITH CHECK ADD FOREIGN KEY([MaPhieuPB])
REFERENCES [dbo].[PhieuPhanBo] ([MaPhieuPB])
GO
ALTER TABLE [dbo].[ChiTietPhanBo]  WITH CHECK ADD FOREIGN KEY([MaLo])
REFERENCES [dbo].[LoHoaChat] ([MaLo])
GO
ALTER TABLE [dbo].[DuTru]  WITH CHECK ADD FOREIGN KEY([MaBaiTN])
REFERENCES [dbo].[BaiThiNghiem] ([MaBaiTN])
GO
ALTER TABLE [dbo].[DuTru]  WITH CHECK ADD FOREIGN KEY([MaHoaChat])
REFERENCES [dbo].[HoaChat] ([MaHoaChat])
GO
ALTER TABLE [dbo].[DuyetDuTru]  WITH CHECK ADD FOREIGN KEY([MaBaiTN])
REFERENCES [dbo].[BaiThiNghiem] ([MaBaiTN])
GO
ALTER TABLE [dbo].[DuyetDuTru]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[DuyetPhieuDX]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[DuyetPhieuDX]  WITH CHECK ADD FOREIGN KEY([MaPhieuDX])
REFERENCES [dbo].[PhieuDeXuat] ([MaPhieuDX])
GO
ALTER TABLE [dbo].[DuyetPhieuTL]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[DuyetPhieuTL]  WITH CHECK ADD FOREIGN KEY([MaPhieuTL])
REFERENCES [dbo].[PhieuThanhLy] ([MaPhieuTL])
GO
ALTER TABLE [dbo].[LoHoaChat]  WITH CHECK ADD FOREIGN KEY([MaHoaChat])
REFERENCES [dbo].[HoaChat] ([MaHoaChat])
GO
ALTER TABLE [dbo].[LoHoaChat]  WITH CHECK ADD FOREIGN KEY([MaPhieuTL])
REFERENCES [dbo].[PhieuThanhLy] ([MaPhieuTL])
GO
ALTER TABLE [dbo].[LoHoaChat]  WITH CHECK ADD FOREIGN KEY([MaPhieuNhap])
REFERENCES [dbo].[PhieuNhap] ([MaPhieuNhap])
GO
ALTER TABLE [dbo].[LopHocPhan]  WITH CHECK ADD  CONSTRAINT [FK_LopHocPhan_MonHoc] FOREIGN KEY([MaMon])
REFERENCES [dbo].[MonHoc] ([MaMon])
GO
ALTER TABLE [dbo].[LopHocPhan] CHECK CONSTRAINT [FK_LopHocPhan_MonHoc]
GO
ALTER TABLE [dbo].[PhieuDeXuat]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[PhieuNhap]  WITH CHECK ADD FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[PhieuPhanBo]  WITH CHECK ADD FOREIGN KEY([MaLHP])
REFERENCES [dbo].[LopHocPhan] ([MaLHP])
GO
ALTER TABLE [dbo].[PhieuThanhLy]  WITH CHECK ADD  CONSTRAINT [FK_PhieuThanhLy_NguoiDung] FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDung] ([MaNguoiDung])
GO
ALTER TABLE [dbo].[PhieuThanhLy] CHECK CONSTRAINT [FK_PhieuThanhLy_NguoiDung]
GO
/****** Object:  StoredProcedure [dbo].[AutoDisposeExpiredChemicals]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AutoDisposeExpiredChemicals]
    @MaNguoiDung INT
AS
BEGIN
    -- Declare variables for date calculation
    DECLARE @CurrentDate DATE = GETDATE();
    DECLARE @ThresholdDate DATE = DATEADD(MONTH, -1, @CurrentDate);

    -- Declare table variable to store messages
    DECLARE @Messages TABLE (Message NVARCHAR(MAX));

    -- Check if there are any chemicals to dispose
    IF EXISTS (
        SELECT 1
        FROM LoHoaChat
        WHERE (HanSuDung <= @ThresholdDate OR SoLuongTon = 0)
          AND TrangThai <> N'Đã thanh lý'
    )
    BEGIN
        -- Insert records into PhieuThanhLy and DuyetPhieuThanhLy for tracking
        DECLARE @NewPhieuThanhLyID INT;

        -- Insert a new record in PhieuThanhLy
        INSERT INTO PhieuThanhLy (LyDo, TrangThai, PhuongThucThanhLy, NgayTao, MaNguoiDung)
        VALUES (N'Thanh lý hóa chất hết hạn', N'Đã duyệt', N'Tự động', @CurrentDate, @MaNguoiDung);

        -- Get the ID of the newly created PhieuThanhLy
        SET @NewPhieuThanhLyID = SCOPE_IDENTITY();

        -- Insert logs for each lot being disposed
        INSERT INTO DuyetPhieuTL (MaPhieuTL, MaNguoiDung, NgayDuyet, TrangThai, LyDoTuChoi)
        SELECT 
            @NewPhieuThanhLyID,
            @MaNguoiDung,
            @CurrentDate,
            N'Đã duyệt',
            N'Thanh lý tự động lô hóa chất đã hết hạn'
        FROM LoHoaChat
        WHERE (HanSuDung <= @ThresholdDate OR SoLuongTon = 0)
          AND TrangThai <> N'Đã thanh lý';

        -- Update status of chemicals expired for more than 1 month or stock equals 0
        UPDATE LoHoaChat
        SET TrangThai = N'Đã thanh lý',
            MaPhieuTL = @NewPhieuThanhLyID
        WHERE (HanSuDung <= @ThresholdDate OR SoLuongTon = 0)
          AND TrangThai <> N'Đã thanh lý';

        -- Add success message
        INSERT INTO @Messages (Message)
        VALUES (N'Thanh lý hóa chất hết hạn sử dụng quá 1 tháng hoặc hết số lượng tồn đã hoàn tất.');
    END
    ELSE
    BEGIN
        -- Add no disposal message
        INSERT INTO @Messages (Message)
        VALUES (N'Không có hóa chất nào cần thanh lý.');
    END

    -- Return all messages
    SELECT * FROM @Messages;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetChemicalDetailsInPhieuThanhLy]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [dbo].[GetMaxQuantityLotByChemicalName]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetMaxQuantityLotByChemicalName]
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
GO
/****** Object:  StoredProcedure [dbo].[GetPhieuThanhLyDetails]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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
/****** Object:  StoredProcedure [dbo].[GetPhieuThanhLyDetailsChiTiet]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [dbo].[ThongKeHoaChatSapHetHan]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ThongKeHoaChatSapHetHan]
    @SoNgayCanhBao INT -- Số ngày để cảnh báo trước khi hết hạn
AS
BEGIN
    SELECT 
        hc.TenHoaChat AS HoaChat,
        hc.SoCAS AS MaCAS,
        lh.SoLo AS MaLo,
        lh.HanSuDung AS HanSuDung,
        DATEDIFF(DAY, GETDATE(), lh.HanSuDung) AS SoNgayConLai,
        lh.SoLuongTon AS SoLuongTon
    FROM LoHoaChat lh
    INNER JOIN HoaChat hc ON lh.MaHoaChat = hc.MaHoaChat
    WHERE 
        lh.HanSuDung BETWEEN GETDATE() AND DATEADD(DAY, @SoNgayCanhBao, GETDATE())
        AND lh.SoLuongTon > 0
    ORDER BY lh.HanSuDung ASC, hc.TenHoaChat;
END;
GO
/****** Object:  StoredProcedure [dbo].[ThongKeHoaChatSuDungTheoMonHoc]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ThongKeHoaChatSuDungTheoMonHoc]
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SELECT 
        mh.TenMon AS MonHoc,
        hc.TenHoaChat AS HoaChat,
        SUM(ctpb.SoLuong) AS TongSoLuongSuDung
    FROM ChiTietPhanBo ctpb
    INNER JOIN LoHoaChat lh ON ctpb.MaLo = lh.MaLo
    INNER JOIN HoaChat hc ON lh.MaHoaChat = hc.MaHoaChat
    INNER JOIN LopHocPhan lhp ON ctpb.MaPhieuPB = lhp.MaLHP
    INNER JOIN MonHoc mh ON lhp.MaMon = mh.MaMon
    INNER JOIN PhieuPhanBo ppb ON ctpb.MaPhieuPB = ppb.MaPhieuPB
    WHERE 
        ppb.NgayLap BETWEEN @StartDate AND @EndDate
    GROUP BY mh.TenMon, hc.TenHoaChat
    ORDER BY mh.TenMon, hc.TenHoaChat;
END;
GO
/****** Object:  StoredProcedure [dbo].[ThongKeHoaChatTonKho]    Script Date: 12/23/2024 12:57:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ThongKeHoaChatTonKho]
AS
BEGIN
    SELECT 
        hc.TenHoaChat AS HoaChat,
        hc.SoCAS AS MaCAS,
        SUM(lh.SoLuongTon) AS TongSoLuongTon,
        COUNT(lh.MaLo) AS SoLoHoaChat
    FROM LoHoaChat lh
    INNER JOIN HoaChat hc ON lh.MaHoaChat = hc.MaHoaChat
    WHERE lh.SoLuongTon > 0
    GROUP BY hc.TenHoaChat, hc.SoCAS
    ORDER BY TongSoLuongTon DESC;
END;
GO
