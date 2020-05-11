using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace NaturalSelectedCards.Utils.Extensions
{
    public static class EnumerableExtensions
    {
        public static string GetValueByType(this IEnumerable<Claim> claims, string claimType)
        {
            return claims.FirstOrDefault(c => c.Type == claimType)?.Value;
        }
    }
}