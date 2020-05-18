using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Entities;


namespace NaturalSelectedCards.Logic.Mappers
{
    public class DeckMapper
    {
        public DeckModel Map(DeckEntity entity)
        {
            return new DeckModel
            {
                Id = entity.Id,
                Title = entity.Title
            };
        }
    }
}