using System;

namespace NaturalSelectedCards.Utils
{
    public static class EnvironmentVariables
    {
        private static class Keys
        {
            public const string ClientId = "NSCARDS_CLIENTID";
            public const string ClientSecret = "NSCARDS_SECRET";

            public const string MongoUsername = "MONGO_USERNAME";
            public const string MongoPassword = "MONGO_PASSWORD";
        }

        public static string ClientId => Environment.GetEnvironmentVariable(Keys.ClientId);
        public static string ClientSecret => Environment.GetEnvironmentVariable(Keys.ClientSecret);
        public static string MongoUsername => Environment.GetEnvironmentVariable(Keys.MongoUsername);
        public static string MongoPassword => Environment.GetEnvironmentVariable(Keys.MongoPassword);
    }
}