using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public interface ICardRepository
    {
        Task<List<CardEntity>> GetCardsByDeckAsync(Guid deckId);
        Task<CardEntity> FindByIdAsync(Guid cardId);
        Task<CardEntity> InsertAsync(CardEntity card);
        Task UpdateAsync(CardEntity card);
        Task DeleteAsync(Guid cardId);
        Task DeleteByDeckAsync(Guid deckId);
    }
}