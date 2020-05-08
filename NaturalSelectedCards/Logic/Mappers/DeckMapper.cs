using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Entities;


namespace NaturalSelectedCards.Logic.Mappers
{
    public class DeckMapper
    {
        public DeckModel Map(DeckEntity entity) {
            // TODO: add mapping for other fields
            var model = new DeckModel();
            model.Id = entity.Id;
            model.Title = entity.Title;
            return model;
        }
    }
}