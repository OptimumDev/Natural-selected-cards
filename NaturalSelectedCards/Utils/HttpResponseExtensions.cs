using IdentityModel.Client;
using Microsoft.AspNetCore.Http;

namespace NaturalSelectedCards
{
    public static class HttpResponseExtensions
    {
        public static void SetTokenCookies(this HttpResponse response, TokenResponse tokenResponse)
        {
            response.Cookies.Append(CustomCookie.AuthorizationToken, tokenResponse.AccessToken,
                CookieHelper.GetSecureCookieOptions(tokenResponse.ExpiresIn));
            
            if (tokenResponse.RefreshToken != null)
                response.Cookies.Append(CustomCookie.AuthorizationRefreshToken, tokenResponse.RefreshToken,
                    CookieHelper.GetSecureCookieOptions());
        }
        
        public static void ClearTokenCookies(this HttpResponse response)
        {
            response.Cookies.Delete(CustomCookie.AuthorizationToken);
            response.Cookies.Delete(CustomCookie.AuthorizationRefreshToken);
        }
    }
}