using System;
using MongoDB.Driver;
using NaturalSelectedCards.Models.Settings;
using NaturalSelectedCards.Utils;

namespace NaturalSelectedCards.Data
{
    public class MongoDatabaseBuilder
    {
        private const string DefaultConnectionString = "mongodb://localhost:27017";

        private readonly DatabaseSettings _settings;

        public MongoDatabaseBuilder(DatabaseSettings settings)
        {
            _settings = settings;
        }

        public IMongoDatabase Build()
        {
            var username = _settings.Username ?? EnvironmentVariables.MongoUsername;
            var password = _settings.Password ?? EnvironmentVariables.MongoPassword;
            var connectionString = username is null || password is null
                ? DefaultConnectionString
                : $"mongodb+srv://{username}:{password}@naturalselectedcluster-4awy4.azure.mongodb.net/" +
                  $"{_settings.DatabaseName}?retryWrites=true&w=majority";
            var client = new MongoClient(connectionString);
            return client.GetDatabase(_settings.DatabaseName);
        }
    }
}