using System;

namespace NaturalSelectedCards.Logic.Models
{
    public class DeckModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}