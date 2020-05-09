using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Repositories;
using NaturalSelectedCards.Data.Entities;
using NaturalSelectedCards.Logic.Mappers;

namespace NaturalSelectedCards.Logic.Managers
{
    public class DeckManager : IDeckManager
    {
        private readonly IDeckRepository deckRepository;
        private readonly ICardRepository cardRepository;
        private readonly DeckMapper deckMapper;
        private readonly CardMapper cardMapper;

        public DeckManager(IDeckRepository deckRepository, ICardRepository cardRepository,
            DeckMapper deckMapper, CardMapper cardMapper)
        {
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
            this.deckMapper = deckMapper;
            this.cardMapper = cardMapper;
        }

        public async Task<List<DeckModel>> GetDecksAsync(Guid userId)
        {
            var decks = await deckRepository.GetUserDecksAsync(userId);
            return decks.ConvertAll(deck => deckMapper.Map(deck));
        }

        public async Task<List<DeckModel>> GetStandardDecksAsync()
        {
            var decks = await deckRepository.GetStandardDecksAsync();
            return decks.ConvertAll(deck => deckMapper.Map(deck));
        }

        public async Task<bool> CopyDeckAsync(Guid userId, Guid deckId)
        {
            var deck = await deckRepository.FindByIdAsync(deckId);
            if (deck == null)
                return false;
            var result = await deckRepository.InsertAsync(deck);
            return result != null;
        }

        public async Task<List<CardModel>> GetAllCardsFromDeckAsync(Guid deckId)
        {
            var cards = await cardRepository.GetCardsByDeckAsync(deckId);
            return cards.ConvertAll(card => cardMapper.Map(card));
        }

        public async Task<Guid?> AddDeckAsync(Guid userId)
        {
            var emptyDeck = new DeckEntity(userId, "");
            var entity = await deckRepository.InsertAsync(emptyDeck);
            return entity?.Id;
        }

        public async Task<bool> UpdateDeckTitleAsync(Guid deckId, string title)
        {
            var deck = await deckRepository.FindByIdAsync(deckId);
            if (deck == null)
                return false;
            var updatedDeck = new DeckEntity(deck.Id, deck.UserId, title);
            var result = await deckRepository.UpdateAsync(updatedDeck);
            return result != null;
        }

        public async Task<bool> DeleteDeckAsync(Guid deckId)
        {
            await deckRepository.DeleteAsync(deckId);
            return true;
        }

        public async Task<List<CardModel>> GetCardsForGameAsync(Guid deckId)
        {
            // TODO: шафлить и фильтровать карточки
            var cards = await cardRepository.GetCardsByDeckAsync(deckId);
            return cards.ConvertAll(card => cardMapper.Map(card));
        }

        public async Task<bool> UpdateCardKnowledgeAsync(Guid cardId, bool isCorrect)
        {
            var card = await cardRepository.FindByIdAsync(cardId);
            if (card == null)
                return false;

            var updatedCard = new CardEntity(
                card.DeckId,
                card.Question,
                card.Answer,
                card.Repetitions + 1,
                card.CorrectAnswers,
                DateTime.Now
            );
            var updatedEntity = await cardRepository.UpdateAsync(updatedCard);
            return updatedEntity != null;
        }

        public async Task<Guid?> AddCardAsync(Guid deckId)
        {
            var card = new CardEntity(deckId, "", "");
            var inserted = await cardRepository.InsertAsync(card);
            return inserted?.Id;
        }

        public async Task<bool> UpdateCardAsync(CardModel cardModel)
        {
            var entity = await cardRepository.FindByIdAsync(cardModel.Id);
            if (entity == null)
                return false;

            var updatedEntity = new CardEntity(
                entity.DeckId,
                cardModel.Question,
                cardModel.Answer,
                entity.Repetitions,
                entity.CorrectAnswers,
                entity.LastRepeat
            );
            var result = await cardRepository.UpdateAsync(updatedEntity);
            return result != null;
        }

        public async Task<bool> DeleteCardAsync(Guid cardId)
        {
            await cardRepository.DeleteAsync(cardId);
            return true;
        }
    }
}