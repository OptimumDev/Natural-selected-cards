using System;

namespace NaturalSelectedCards.Models
{
    public class CardResponse
    {
        public Guid Id { get; set; }
        public Guid DeckId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Repetitions { get; set; }
        public int CorrectAnswers { get; set; }
        public DateTime LastRepeat { get; set; }
    }
}