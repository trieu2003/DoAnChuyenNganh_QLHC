using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API_QLHC_DOAN.Services
{
    public class EmailService
    {
        private readonly string _sendGridApiKey = ".."; // Thay bằng API Key thực tế của bạn

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var client = new SendGridClient(_sendGridApiKey);
            var from = new EmailAddress("huynhthanhtrieu00@gmail.com", "OTP Service: ");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, body);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
