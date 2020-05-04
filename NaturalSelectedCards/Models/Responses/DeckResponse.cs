using System;

namespace NaturalSelectedCards.Models.Responses
{
    public class DeckResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int PlayedCount { get; set; }
        public int CardsCount { get; set; }
        public double Rating { get; set; }
        public DateTime? LastRepetition { get; set; }
    }
}