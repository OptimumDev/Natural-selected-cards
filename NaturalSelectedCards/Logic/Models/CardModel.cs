using System;

namespace NaturalSelectedCards.Logic.Models
{
    public class CardModel
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}