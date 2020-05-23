using System;
using NaturalSelectedCards.Logic.Models;

namespace NaturalSelectedCards.Models.Responses
{
    public class CardResponse
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

        public static CardResponse FromCard(CardModel card)
        {
            return new CardResponse
            {
                Id = card.Id,
                Question = card.Question,
                Answer = card.Answer
            };
        }
    }
}