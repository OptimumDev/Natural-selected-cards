using System;
using MongoDB.Bson.Serialization.Attributes;

namespace NaturalSelectedCards.Data.Entities
{
    public class DeckEntity
    {
        public Guid Id { get; private set; }
        [BsonElement] public readonly Guid UserId;
        [BsonElement] public readonly string Title;

        public DeckEntity(Guid userId, string title) : this(Guid.Empty, userId, title)
        {
        }

        [BsonConstructor]
        public DeckEntity(Guid id, Guid userId, string title)
        {
            Id = id;
            UserId = userId;
            Title = title;
        }
    }
}