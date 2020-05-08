using System;
using Microsoft.AspNetCore.Http;

namespace NaturalSelectedCards
{
    public static class CookieHelper
    {
        public static CookieOptions GetSecureCookieOptions(int? expiresInSeconds = null) => new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = expiresInSeconds != null 
                ? DateTimeOffset.UtcNow.AddHours(5).AddSeconds(expiresInSeconds.Value)
                : (DateTimeOffset?) null
        };
    }
}