using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NaturalSelectedCards.Controllers
{
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        private const string Address = "https://oauth2.googleapis.com/token";
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] string authCode)
        {
            using var client = new HttpClient();

            var response = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
            {
                Address = Address,

                ClientId = "",
                ClientSecret = "",

                Code = authCode,
                RedirectUri = "https://localhost:5001/api/v1/auth/login",
            });

            if (response.IsError)
                return Unauthorized(response.Error);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                //Expires = new DateTimeOffset(response.ExpiresIn),
                Secure = true
            };
                    
            Response.Cookies.Append("Authorization-Token", response.AccessToken, cookieOptions);

            return Ok();
        }
    }
}