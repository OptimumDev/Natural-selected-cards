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
            Expires = DateTimeOffset.Now.AddSeconds(expiresInSeconds)
        };

        public static CookieOptions GetSecureCookieOptions() => new CookieOptions
        {
            HttpOnly = true,
            Secure = true
        };
    }
}
