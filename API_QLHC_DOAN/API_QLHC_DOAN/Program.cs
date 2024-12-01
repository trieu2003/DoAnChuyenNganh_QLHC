using API_QLHC_DOAN.Data;
//using API_QLHC_DOAN.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký DbContext với kết nối tới cơ sở dữ liệu
builder.Services.AddDbContext<YourDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Đăng ký các dịch vụ của bạn vào DI container
//builder.Services.AddScoped<PhieuThanhLyService>();  // Đăng ký PhieuThanhLyService (nếu bạn có service này)



// Đăng ký các controller
builder.Services.AddControllers();

// Đăng ký Swagger cho môi trường phát triển
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
        builder.WithOrigins("http://localhost:5173") // Thay đổi theo địa chỉ nguồn của bạn
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials());
});

var app = builder.Build();

// Cấu hình middleware CORS
app.UseCors("AllowSpecificOrigin");

// Cấu hình Swagger (chỉ trong môi trường phát triển)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Cấu hình các middleware khác
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers(); // Ánh xạ các controller

app.Run();
