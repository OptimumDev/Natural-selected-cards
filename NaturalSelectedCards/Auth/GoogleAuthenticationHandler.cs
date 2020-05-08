using System;
using System.Collections.Generic;
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
            if (!Request.Cookies.TryGetValue(CustomCookie.AuthorizationToken, out var token))
            {
                if (!Request.Cookies.TryGetValue(CustomCookie.AuthorizationRefreshToken, out var refreshToken))
                    return AuthenticateResult.Fail("No auth or refresh code");

                var refreshResponse = await client.RequestRefreshTokenAsync(new RefreshTokenRequest
                {
                    ClientId = EnvironmentVariables.ClientId,
                    ClientSecret = EnvironmentVariables.ClientSecret,

                    Address = Urls.TokenAddress,
                    RefreshToken = refreshToken
                }).ConfigureAwait(false);
                
                if (refreshResponse.IsError)
                    return AuthenticateResult.Fail(refreshResponse.Error);
                Response.SetTokenCookies(refreshResponse);
                
                token = refreshResponse.AccessToken;
            }
            
            var userInfo = await client.GetUserInfoAsync(new UserInfoRequest
            {
                Address = Urls.UserInfoAddress,
                Token = token
            }).ConfigureAwait(false);

            if (userInfo.IsError)
                return AuthenticateResult.Fail($"Google auth fail {userInfo.Error}");

            var userId = userInfo.Claims.FirstOrDefault(i => i.Type == "sub");
            if (userId == null)
                return AuthenticateResult.Fail("No sub claim");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.Value), // to GUID from repository
                new Claim(CustomClaimType.Photo, GetClaimValue(userInfo, CustomClaimType.OpenIDConnect.Picture)), //todo check null
                new Claim(ClaimTypes.Name, GetClaimValue(userInfo, CustomClaimType.OpenIDConnect.FirstName)), 
                new Claim(ClaimTypes.Surname, GetClaimValue(userInfo, CustomClaimType.OpenIDConnect.LastName)), 
            };

            var claimsIdentity = new ClaimsIdentity(claims, nameof(GoogleAuthenticationHandler));

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), Scheme.Name);
            
            return AuthenticateResult.Success(ticket);
        }

        private static string GetClaimValue(UserInfoResponse response, string claim)
        {
            return response.Claims.FirstOrDefault(c => c.Type == claim)?.Value;
        }
    }
}