using System;

namespace NaturalSelectedCards.Logic.Models
{
    public class DeckModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int PlayedCount { get; set; }
        public int CardsCount { get; set; }
        public double Rating { get; set; }
        public DateTime? LastRepetition { get; set; }
    }
}