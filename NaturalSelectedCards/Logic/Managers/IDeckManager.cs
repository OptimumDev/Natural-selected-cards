using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Logic.Models;

namespace NaturalSelectedCards.Logic.Managers
{
    public interface IDeckManager
    {
        Task<List<DeckModel>> GetDecksAsync(Guid userId);
        Task<List<DeckModel>> GetStandartDecksAsync();
        Task<bool> CopyDeckAsync(Guid userId, Guid deckId);
        Task<List<CardModel>> GetAllCardsFromDeckAsync(Guid deckId);
        Task<Guid> AddDeckAsync(Guid userId);
        Task<bool> UpdateDeckTitleAsync(Guid deckId, String title);
        Task<bool> DeleteDeckAsync(Guid deckId);
        Task<List<CardModel>> GetCardsForGameAsync(Guid deckId);
        Task<bool> UpdateCardKnowledgeAsync(Guid cardId, Boolean isCorrect);
        Task<Guid> AddCardAsync(Guid deckId);
        Task<bool> UpdateCardAsync(Guid cardId, CardModel cardModel);
        Task<bool> DeleteCardAsync(Guid cardId);
    }
}