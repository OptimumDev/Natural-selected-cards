using System;

namespace NaturalSelectedCards.Data.Entities
{
    public class CardEntity
    {
        // ReSharper disable once UnusedAutoPropertyAccessor.Local
        public Guid Id { get; private set; }
        public Guid DeckId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Repetitions { get; set; }
        public int CorrectAnswers { get; set; }
        public DateTime LastRepeat { get; set; }
    }
}