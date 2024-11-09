﻿// <auto-generated />
using System;
using API_QLHC_DOAN.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API_QLHC_DOAN.Migrations
{
    [DbContext(typeof(YourDbContext))]
    [Migration("20241104130351_LoHoaChat")]
    partial class LoHoaChat
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API_QLHC_DOAN.Models.ChiTietDeXuat", b =>
                {
                    b.Property<int>("MaPhieuDX")
                        .HasColumnType("int");

                    b.Property<int>("MaHoaChat")
                        .HasColumnType("int");

                    b.Property<decimal>("DonGia")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.HasKey("MaPhieuDX", "MaHoaChat");

                    b.HasIndex("MaHoaChat");

                    b.ToTable("ChiTietDeXuat");
                });

            modelBuilder.Entity("API_QLHC_DOAN.Models.HoaChat", b =>
                {
                    b.Property<int>("MaHoaChat")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaHoaChat"));

                    b.Property<string>("CongThucHoaHoc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DonVi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HinhAnh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MoTa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguyHiem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoCAS")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SoLieuAnToan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenHoaChat")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ThoiHanSuDung")
                        .HasColumnType("datetime2");

                    b.HasKey("MaHoaChat");

                    b.ToTable("HoaChat");
                });

            modelBuilder.Entity("API_QLHC_DOAN.Models.LoHoaChat", b =>
                {
                    b.Property<int>("MaLo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaLo"));

                    b.Property<string>("GhiChu")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("HanSuDung")
                        .HasColumnType("datetime2");

                    b.Property<int>("MaHoaChat")
                        .HasColumnType("int");

                    b.Property<int?>("MaPhieuNhap")
                        .HasColumnType("int");

                    b.Property<int?>("MaPhieuTL")
                        .HasColumnType("int");

                    b.Property<string>("NhaCungCap")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<int>("SoLuongTon")
                        .HasColumnType("int");

                    b.Property<string>("TrangThai")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("MaLo");

                    b.ToTable("LoHoaChat");
                });

            modelBuilder.Entity("API_QLHC_DOAN.Models.NguoiDung", b =>
                {
                    b.Property<int>("MaNguoiDung")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaNguoiDung"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MatKhauHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("TenDangNhap")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("VaiTro")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MaNguoiDung");

                    b.ToTable("NguoiDung");
                });

            modelBuilder.Entity("API_QLHC_DOAN.Models.PhieuDeXuat", b =>
                {
                    b.Property<int>("MaPhieuDX")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaPhieuDX"));

                    b.Property<string>("LyDo")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<int>("SoLuongDeXuat")
                        .HasColumnType("int");

                    b.Property<string>("TrangThai")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("MaPhieuDX");

                    b.ToTable("PhieuDeXuat");
                });

            modelBuilder.Entity("API_QLHC_DOAN.Models.ChiTietDeXuat", b =>
                {
                    b.HasOne("API_QLHC_DOAN.Models.HoaChat", "HoaChat")
                        .WithMany()
                        .HasForeignKey("MaHoaChat")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API_QLHC_DOAN.Models.PhieuDeXuat", "PhieuDeXuat")
                        .WithMany()
                        .HasForeignKey("MaPhieuDX")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("HoaChat");

                    b.Navigation("PhieuDeXuat");
                });
#pragma warning restore 612, 618
        }
    }
}
