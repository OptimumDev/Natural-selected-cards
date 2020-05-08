using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Entities;
using NaturalSelectedCards.Data.Repositories;

namespace NaturalSelectedCards.Logic.Managers
{
    public class DeckManager: IDeckManager
    {

        private IDeckRepository deckRepository;
        private ICardRepository cardRepository;

        public DeckManager(IDeckRepository deckRepository, ICardRepository cardRepository) {
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
        }

        public async Task<List<DeckEntity>> GetDecksFor(Guid userId) {
            return await deckRepository.GetUserDecksAsync(userId);
        }
        public async Task<List<DeckEntity>> GetStandartDecks() {
            return await deckRepository.GetStandardDecksAsync();
        }
        public async Task<DeckEntity> AddStandartDeck(Guid userId, Guid deckId) {
            var decks = await deckRepository.GetStandardDecksAsync();
            var deck = decks.Find(d => d.Id == deckId);
            deck.UserId = userId;
            return await deckRepository.InsertAsync(deck);
        }
        // придумать что возвращать bool, или колоду
        public Task<List<CardEntity>> GetAllCardsFromDeck(Guid deckId) {

        }
        public Task<DeckEntity> UpdateDeck(DeckEntity deck) {

        }
        public Task<DeckEntity> AddDeck(Guid userId, DeckEntity deck) {

        }
        public Task<Boolean> DeleteDeck(Guid userId, Guid deckId) {

        }
        public Task<List<CardEntity>> GetCardsForGame(Guid userId, Guid deckId) {

        }
        public Task<Boolean> UpdateCardKnowledge(Guid userId, Guid cardId, Boolean isCorrect) {

        }
    }
}