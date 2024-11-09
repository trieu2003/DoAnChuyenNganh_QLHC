using API_QLHC_DOAN.Data;
using API_QLHC_DOAN.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
// Program.cs
builder.Services.AddDbContext<YourDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Thêm dịch vụ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") // Thay đổi theo địa chỉ nguồn của bạn
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials()); // Bổ sung AllowCredentials để gửi cookie hoặc thông tin xác thực khác);
});


// Đăng ký các dịch vụ của bạn
builder.Services.AddScoped<OtpService>();  // Thêm dịch vụ OtpService
builder.Services.AddScoped<EmailService>(); // Thêm dịch vụ EmailService
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Cấu hình middleware CORS
app.UseCors("AllowSpecificOrigin"); // Áp dụng chính sách CORS ở đây

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
