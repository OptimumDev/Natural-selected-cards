using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Entities;


namespace NaturalSelectedCards.Logic.Mappers
{
    public class DeckMapper
    {
        public DeckModel Map(DeckEntity entity)
        {
            // TODO: add mapping for other fields
            return new DeckModel
            {
                Id = entity.Id,
                Title = entity.Title
            };
        }
    }
}