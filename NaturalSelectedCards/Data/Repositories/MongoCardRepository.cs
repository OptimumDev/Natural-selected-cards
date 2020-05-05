using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public class MongoCardRepository : ICardRepository
    {
        public const string CollectionName = "cards";

        private readonly IMongoCollection<CardEntity> _cardCollection;

        public MongoCardRepository(IMongoDatabase database)
        {
            _cardCollection = database.GetCollection<CardEntity>(CollectionName);
            _cardCollection.Indexes.CreateOne(new CreateIndexModel<CardEntity>(
                Builders<CardEntity>.IndexKeys.Hashed(c => c.DeckId)
            ));
        }

        public Task<List<CardEntity>> GetCardsByDeckAsync(Guid deckId)
        {
            return _cardCollection.Find(c => c.DeckId == deckId).ToListAsync();
        }

        public Task<CardEntity> FindByIdAsync(Guid cardId)
        {
            return _cardCollection.Find(c => c.Id == cardId).FirstOrDefaultAsync();
        }

        public async Task<CardEntity> InsertAsync(CardEntity card)
        {
            await _cardCollection.InsertOneAsync(card);
            return card;
        }

        public async Task<CardEntity> UpdateAsync(CardEntity card)
        {
            await _cardCollection.ReplaceOneAsync(c => c.Id == card.Id, card);
            return card;
        }

        public Task DeleteAsync(Guid cardId)
        {
            return _cardCollection.DeleteOneAsync(c => c.Id == cardId);
        }

        public Task DeleteByDeckAsync(Guid deckId)
        {
            return _cardCollection.DeleteManyAsync(c => c.DeckId == deckId);
        }
    }
}