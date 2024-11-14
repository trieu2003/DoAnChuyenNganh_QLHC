using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_QLHC_DOAN.Services
{
    public class OtpService
    {
        private static readonly Dictionary<string, string> OtpCache = new Dictionary<string, string>();

        public string GenerateOtp(string email)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            OtpCache[email] = otp;
            return otp;
        }

        public bool VerifyOtp(string email, string otp)
        {
            if (OtpCache.ContainsKey(email))
            {
                return OtpCache[email] == otp;
            }
            return false;
        }
    }
}
