using System;

namespace NaturalSelectedCards.Utils
{
    public static class EnvironmentVariables
    {
        private static class Keys
        {
            public const string ClientId = "NSCARDS_CLIENTID";
            public const string ClientSecret = "NSCARDS_SECRET";
        }

        public static string ClientId => Environment.GetEnvironmentVariable(Keys.ClientId);
        public static string ClientSecret => Environment.GetEnvironmentVariable(Keys.ClientSecret);
    }
}