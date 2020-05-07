using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace NaturalSelectedCards
{
    public class GoogleAuthenticationHandler
        : AuthenticationHandler<GoogleAuthenticationSchemeOptions>
    {
        private const string AuthCookieName = "Authorization-Token";
        private const string Address = "https://oauth2.googleapis.com/token";
        
        public GoogleAuthenticationHandler(
            IOptionsMonitor<GoogleAuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Cookies.TryGetValue(AuthCookieName, out var token))
                return AuthenticateResult.Fail("No auth code");
            
            using var client = new HttpClient();

            var userInfo = await client.GetUserInfoAsync(new UserInfoRequest
            {
                Address = "https://openidconnect.googleapis.com/v1/userinfo",
                Token = token
            });

            if (userInfo.IsError)
                return AuthenticateResult.Fail($"Google auth fail {userInfo.Error}");

            var userId = userInfo.Claims.FirstOrDefault(i => i.Type == "sub");
            if (userId == null)
                return AuthenticateResult.Fail("No sub claim");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.Value)
            };

            var claimsIdentity = new ClaimsIdentity(claims, nameof(GoogleAuthenticationHandler));

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), Scheme.Name);
            
            return AuthenticateResult.Success(ticket);
        }
    }
}