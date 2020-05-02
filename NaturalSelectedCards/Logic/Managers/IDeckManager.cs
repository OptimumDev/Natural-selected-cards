using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Logic.Managers
{
    public interface IDeckManager
    {
        Task<List<DeckEntity>> GetDecksFor(Guid userId);
        Task<List<DeckEntity>> GetStandartDecks();
        Task<DeckEntity> AddStandartDeck(Guid userId, Guid deckId);
        // придумать что возвращать bool, или колоду
        Task<List<CardEntity>> GetAllCardsFromDeck(Guid userId, Guid deckId);
        Task<DeckEntity> UpdateDeck(Guid userId, DeckEntity deck);
        Task<DeckEntity> AddDeck(Guid userId, DeckEntity deck);
        Task<Boolean> DeleteDeck(Guid userId, Guid deckId);
        Task<List<CardEntity>> GetCardsForGame(Guid userId, Guid deckId);
        Task<Boolean> UpdateCardKnowledge(Guid userId, Guid cardId, Boolean isCorrect);
    }
}