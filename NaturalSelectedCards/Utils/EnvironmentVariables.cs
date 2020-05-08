using System;

namespace NaturalSelectedCards
{
    public static class EnvironmentVariables
    {
        public static string ClientId { get; } = Environment.GetEnvironmentVariable("NSCARDS_CLIENTID");
        public static string ClientSecret { get; } = Environment.GetEnvironmentVariable("NSCARDS_SECRET");
    }
}