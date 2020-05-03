using System;

namespace NaturalSelectedCards.Models.Responses
{
    public class CardResponse
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}