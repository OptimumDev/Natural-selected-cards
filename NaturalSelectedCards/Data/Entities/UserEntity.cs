using System;
using MongoDB.Bson.Serialization.Attributes;

namespace NaturalSelectedCards.Data.Entities
{
    public class UserEntity
    {
        public Guid Id { get; private set; }
        [BsonElement] public readonly string GoogleId;

        public UserEntity(string googleId) : this(Guid.Empty, googleId)
        {
        }

        [BsonConstructor]
        public UserEntity(Guid id, string googleId)
        {
            Id = id;
            GoogleId = googleId;
        }
    }
}