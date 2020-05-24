using System;
using NaturalSelectedCards.Logic.Models;

namespace NaturalSelectedCards.Models.Responses
{
    public class DeckResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int GamesCount { get; set; }
        public int CardsCount { get; set; }
        public double UserRating { get; set; }
        public DateTime? LastRepeatTime { get; set; }

        public static DeckResponse FromDeck(DeckModel deck)
        {
            return new DeckResponse
            {
                Name = deck.Title,
                Id = deck.Id,
                GamesCount = deck.PlayedCount,
                CardsCount = deck.CardsCount,
                UserRating = deck.Rating,
                LastRepeatTime = deck.LastRepetition
            };
        }
    }
}