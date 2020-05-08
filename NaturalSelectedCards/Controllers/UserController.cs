using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserInfo = NaturalSelectedCards.Models.Responses.UserInfoResponse;

namespace NaturalSelectedCards.Controllers
{
    [Authorize(AuthenticationSchemes = "Google")]
    [Route("api/v1/users")]
    public class UserController : Controller
    {
        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<IActionResult> Authenticate([FromBody] string authCode)
        {
            using var client = new HttpClient();

            var response = await client.RequestAuthorizationCodeTokenAsync(new AuthorizationCodeTokenRequest
            {
                Address = Urls.TokenAddress,

                ClientId = EnvironmentVariables.ClientId,
                ClientSecret = EnvironmentVariables.ClientSecret,

                Code = authCode,
                RedirectUri = "postmessage"
            }).ConfigureAwait(false);
            
            if (response.IsError)
                return BadRequest(response.Error);

            Response.SetTokenCookies(response);

            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            Response.ClearTokenCookies();
            
            return Ok();
        }

        [HttpGet("me")]
        public ActionResult<UserInfo> GetUserInfo()
        {
            return Ok(new UserInfo
            {
                FirstName = GetClaimValue(ClaimTypes.Name),
                LastName = GetClaimValue(ClaimTypes.Surname),
                PhotoUrl = GetClaimValue(CustomClaimType.Photo)
            });
        }

        private string GetClaimValue(string claim)
        {
            return User.Claims.FirstOrDefault(c => c.Type == claim)?.Value;
        }
    }
}