using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public class MongoDeckRepository : IDeckRepository
    {
        public const string CollectionName = "decks";

        private readonly IMongoCollection<DeckEntity> _deckCollection;

        public MongoDeckRepository(IMongoDatabase database)
        {
            _deckCollection = database.GetCollection<DeckEntity>(CollectionName);
            _deckCollection.Indexes.CreateOne(new CreateIndexModel<DeckEntity>(
                Builders<DeckEntity>.IndexKeys.Ascending(d => d.UserId)
            ));
        }

        public Task<List<DeckEntity>> GetUserDecksAsync(Guid userId)
        {
            return _deckCollection.Find(d => d.UserId == userId).ToListAsync();
        }

        public Task<List<DeckEntity>> GetStandardDecksAsync() => GetUserDecksAsync(Guid.Empty);

        public Task<DeckEntity> FindByIdAsync(Guid deckId)
        {
            return _deckCollection.Find(d => d.Id == deckId).FirstOrDefaultAsync();
        }

        public async Task<DeckEntity> InsertAsync(DeckEntity deck)
        {
            await _deckCollection.InsertOneAsync(deck);
            return deck;
        }

        public async Task<DeckEntity> UpdateAsync(DeckEntity deck)
        {
            await _deckCollection.ReplaceOneAsync(d => d.Id == deck.Id, deck);
            return deck;
        }

        public Task DeleteAsync(Guid deckId)
        {
            return _deckCollection.DeleteOneAsync(d => d.Id == deckId);
        }
    }
}