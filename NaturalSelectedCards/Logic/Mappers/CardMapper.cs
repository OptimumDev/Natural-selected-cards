using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Data.Entities;


namespace NaturalSelectedCards.Logic.Mappers
{
    public class CardMapper
    {
        public CardModel Map(CardEntity entity)
        {
            return new CardModel
            {
                Id = entity.Id,
                Question = entity.Question,
                Answer = entity.Answer
            };
        }
    }
}