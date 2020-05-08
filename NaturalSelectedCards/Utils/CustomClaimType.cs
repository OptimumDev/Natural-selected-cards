using System.Linq;
using IdentityModel.Client;

namespace NaturalSelectedCards
{
    public static class CustomClaimType
    {
        public static string Photo => "Photo";
        public static class OpenIDConnect
        {
            public static string Sub => "sub";
            public static string Picture => "picture";
            public static string FirstName => "given_name";
            public static string LastName => "family_name";
        }
    }
}