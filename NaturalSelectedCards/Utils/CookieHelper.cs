using System;
using Microsoft.AspNetCore.Http;

namespace NaturalSelectedCards.Utils
{
    public static class CookieHelper
    {
        public static CookieOptions GetSecureCookieOptions(int expiresInSeconds) => new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            Expires = DateTimeOffset.UtcNow.AddHours(5).AddSeconds(expiresInSeconds)
        };

        public static CookieOptions GetSecureCookieOptions() => new CookieOptions
        {
            HttpOnly = true,
            Secure = true
        };
    }
}