using System;

namespace NaturalSelectedCards.Models
{
    public class DeckResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}