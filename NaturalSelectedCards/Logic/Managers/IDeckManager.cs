using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Logic.Models;

namespace NaturalSelectedCards.Logic.Managers
{
    public interface IDeckManager
    {
        Task<List<DeckModel>> GetDecksFor(Guid userId);
        Task<List<DeckModel>> GetStandartDecks();
        Task<DeckModel> AddStandartDeck(Guid userId, Guid deckId);
        // придумать что возвращать bool, или колоду
        Task<List<CardModel>> GetAllCardsFromDeck(Guid userId, Guid deckId);
        Task<DeckModel> UpdateDeck(Guid userId, DeckModel deck);
        Task<DeckModel> AddDeck(Guid userId, DeckModel deck);
        Task<Boolean> DeleteDeck(Guid userId, Guid deckId);
        Task<List<CardModel>> GetCardsForGame(Guid userId, Guid deckId);
        Task<Boolean> UpdateCardKnowledge(Guid userId, Guid cardId, Boolean isCorrect);
    }
}