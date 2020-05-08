using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
using NaturalSelectedCards.Utils.Constants;

namespace NaturalSelectedCards.Utils.Extensions
{
    public static class HttpResponseExtensions
    {
        public static void SetTokenCookies(this HttpResponse response, TokenResponse tokenResponse)
        {
            response.Cookies.Append(CookieKeys.AuthorizationToken, tokenResponse.AccessToken,
                CookieHelper.GetSecureCookieOptions(tokenResponse.ExpiresIn));
            
            if (tokenResponse.RefreshToken != null)
                response.Cookies.Append(CookieKeys.AuthorizationRefreshToken, tokenResponse.RefreshToken,
                    CookieHelper.GetSecureCookieOptions());
        }
        
        public static void ClearTokenCookies(this HttpResponse response)
        {
            response.Cookies.Delete(CookieKeys.AuthorizationToken);
            response.Cookies.Delete(CookieKeys.AuthorizationRefreshToken);
        }
    }
}