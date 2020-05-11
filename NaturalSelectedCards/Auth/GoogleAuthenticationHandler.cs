using System.Net.Http;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NaturalSelectedCards.Utils;
using NaturalSelectedCards.Utils.Constants;
using NaturalSelectedCards.Utils.Constants.ClaimTypes;
using NaturalSelectedCards.Utils.Extensions;

namespace NaturalSelectedCards.Auth
{
    public class GoogleAuthenticationHandler
        : AuthenticationHandler<GoogleAuthenticationSchemeOptions>
    {
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
            using var client = new HttpClient(); // todo

            if (Request.Cookies.TryGetValue(CookieKeys.AuthorizationToken, out var token))
                return await AuthenticateWithToken(client, token);

            if (Request.Cookies.TryGetValue(CookieKeys.AuthorizationRefreshToken, out var refreshToken))
                return await AuthenticateWithRefresh(client, refreshToken);

            return AuthenticateResult.Fail("No auth or refresh token");
        }

        private async Task<AuthenticateResult> AuthenticateWithRefresh(HttpClient client, string refreshToken)
        {
            var refreshResponse = await client.RequestRefreshTokenAsync(new RefreshTokenRequest
            {
                ClientId = EnvironmentVariables.ClientId,
                ClientSecret = EnvironmentVariables.ClientSecret,

                Address = Urls.TokenAddress,
                RefreshToken = refreshToken
            }).ConfigureAwait(false);

            if (refreshResponse.IsError)
                return AuthenticateResult.Fail($"Google refresh fail: {refreshResponse.Error}");

            Response.SetTokenCookies(refreshResponse);

            return await AuthenticateWithToken(client, refreshResponse.AccessToken);
        }

        private async Task<AuthenticateResult> AuthenticateWithToken(HttpClient client, string token)
        {
            var userInfo = await client.GetUserInfoAsync(new UserInfoRequest
            {
                Address = Urls.UserInfoAddress,
                Token = token
            }).ConfigureAwait(false);

            return userInfo.IsError
                ? AuthenticateResult.Fail($"Google auth fail: {userInfo.Error}")
                : AuthenticateWithUserInfo(userInfo);
        }

        private AuthenticateResult AuthenticateWithUserInfo(UserInfoResponse userInfo)
        {
            var userId = userInfo.Claims.GetValueByType(GoogleClaimTypes.Sub);
            if (userId == null)
                return AuthenticateResult.Fail("No sub claim");

            var name = userInfo.Claims.GetValueByType(GoogleClaimTypes.FirstName) ?? "";
            var surname = userInfo.Claims.GetValueByType(GoogleClaimTypes.LastName) ?? "";
            var photo = userInfo.Claims.GetValueByType(GoogleClaimTypes.Picture) ?? "";

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId), // to GUID from repository
                new Claim(ClaimTypes.Name, name),
                new Claim(ClaimTypes.Surname, surname),
                new Claim(CustomClaimTypes.Photo, photo)
            };

            var claimsIdentity = new ClaimsIdentity(claims, nameof(GoogleAuthenticationHandler));

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}