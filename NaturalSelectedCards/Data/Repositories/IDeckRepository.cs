using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public interface IDeckRepository
    {
        Task<List<DeckEntity>> GetUserDecksAsync(Guid userId);
        Task<List<DeckEntity>> GetStandardDecksAsync();
        Task<DeckEntity> FindByIdAsync(Guid deckId);
        Task<DeckEntity> InsertAsync(DeckEntity deck);
        Task UpdateAsync(DeckEntity deck);
        Task DeleteAsync(Guid deckId);
    }
}