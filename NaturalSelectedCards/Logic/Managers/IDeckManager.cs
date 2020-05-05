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
        Task<bool> UpdateDeckAsync(DeckModel deck);
        Task<bool> AddDeckAsync(Guid userId, DeckModel deck);
        Task<bool> DeleteDeckAsync(Guid deckId);
        Task<List<CardModel>> GetCardsForGameAsync(Guid deckId);
        Task<bool> UpdateCardKnowledgeAsync(Guid userId, Guid cardId, Boolean isCorrect);
        Task<CardModel> CreateCardAsync(Guid deckId);
        Task<CardModel> UpdateCardTitleAsync(Guid cardId, String title);
        Task<bool> DeleteCardAsync(Guid cardId);
    }
}