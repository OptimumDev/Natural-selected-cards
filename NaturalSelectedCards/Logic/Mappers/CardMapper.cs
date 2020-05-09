using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Entities;


namespace NaturalSelectedCards.Logic.Mappers
{
    public class CardMapper
    {
        public CardModel Map(CardEntity entity)
        {
            var model = new CardModel();
            model.Id = entity.Id;
            model.Question = entity.Question;
            model.Answer = entity.Answer;
            return model;
        }
    }
}