using System;

namespace NaturalSelectedCards.Data.Entities
{
    public class DeckEntity
    {
        // ReSharper disable once UnusedAutoPropertyAccessor.Local
        public Guid Id { get; private set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}