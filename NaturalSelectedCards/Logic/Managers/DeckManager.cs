using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
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

        private readonly Random rng;

        public DeckManager(IDeckRepository deckRepository, ICardRepository cardRepository,
            DeckMapper deckMapper, CardMapper cardMapper, Random rng)
        {
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
            this.deckMapper = deckMapper;
            this.cardMapper = cardMapper;
            this.rng = rng;
        }

        public async Task<List<DeckModel>> GetDecksAsync(Guid userId)
        {
            var deckEntities = await deckRepository.GetUserDecksAsync(userId);
            var decks = deckEntities.ConvertAll(deck => deckMapper.Map(deck));
            foreach (var deck in decks)
            {
                //TODO statistics in one run
                var cards = await cardRepository.GetCardsByDeckAsync(deck.Id);
                GatherStatistics(deck, cards);
            }

            return decks;
        }

        public async Task<List<DeckModel>> GetStandardDecksAsync()
        {
            var deckEntities = await deckRepository.GetStandardDecksAsync();
            var decks = deckEntities.ConvertAll(deck => deckMapper.Map(deck));
            foreach (var deck in decks)
            {
                var cards = await cardRepository.GetCardsByDeckAsync(deck.Id);
                deck.CardsCount = cards.Count;
            }

            return decks;
        }

        public async Task<bool> CopyDeckAsync(Guid userId, Guid deckId)
        {
            var deck = await deckRepository.FindByIdAsync(deckId);
            if (deck == null)
                return false;

            var newDeck = new DeckEntity(userId, deck.Title);
            var result = await deckRepository.InsertAsync(newDeck);
            var cards = await cardRepository.GetCardsByDeckAsync(deck.Id);
            if (result == null || cards == null)
                return false;
            //TODO parallel with awaiting and result checking
            foreach (var card in cards)
            {
                var copiedCard = new CardEntity(result.Id, card.Question, card.Answer);
                cardRepository.InsertAsync(copiedCard);
            }
            return true;

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
            if (entity.Id != null) 
                await AddCardAsync(entity.Id);
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
            var cards = await cardRepository.GetCardsByDeckAsync(deckId);
            return GatherCardsForGame(cards);
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
                card.CorrectAnswers + (isCorrect ? 1 : 0),
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
                cardModel.Answer
            );
            var result = await cardRepository.UpdateAsync(updatedEntity);
            return result != null;
        }

        public async Task<bool> DeleteCardAsync(Guid cardId)
        {
            await cardRepository.DeleteAsync(cardId);
            return true;
        }

        private List<CardModel> GatherCardsForGame(List<CardEntity> cards) {
            var cardsForGame = new List<CardModel>();

            var ratingCards = cards
            .OrderBy(card => card.CorrectAnswers / (card.Repetitions == 0 ? 1 : card.Repetitions))
            .Take(5)
            .Select(card => cardMapper.Map(card));

            var timeCards = cards
            .OrderBy(card => card.LastRepeat)
            .Take(5)
            .Select(card => cardMapper.Map(card));

            cardsForGame.AddRange(ratingCards);
            cardsForGame.AddRange(timeCards);

            return cardsForGame.OrderBy(x => rng.Next()).ToList();
        }

        private void GatherStatistics(DeckModel deck, List<CardEntity> cards) {
            var overalRaiting = 0.0;
            var playedCount = 0;
            var lastRepetition = DateTime.MinValue;

            foreach (var card in cards) 
            {
                if (card.Repetitions <= 0)
                    continue;
                if (card.Repetitions > playedCount)
                    playedCount = card.Repetitions;

                if (card.LastRepeat > lastRepetition)
                    lastRepetition = card.LastRepeat;

                overalRaiting += 1.0 * card.CorrectAnswers / (card.Repetitions == 0 ? 1 : card.Repetitions);
            }

            deck.CardsCount = cards.Count;
            deck.PlayedCount = playedCount;
            deck.Rating = overalRaiting / cards.Count;
            deck.LastRepetition = lastRepetition;
        }
    }
}
