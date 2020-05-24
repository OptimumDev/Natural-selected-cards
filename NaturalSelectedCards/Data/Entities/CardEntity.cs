using System;
using MongoDB.Bson.Serialization.Attributes;

namespace NaturalSelectedCards.Data.Entities
{
    public class CardEntity
    {
        public Guid Id { get; private set; }
        [BsonElement] public readonly Guid DeckId;
        [BsonElement] public readonly string Question;
        [BsonElement] public readonly string Answer;
        [BsonElement] public readonly int Repetitions;
        [BsonElement] public readonly int CorrectAnswers;
        [BsonElement] public readonly DateTime LastRepeat;

        public CardEntity(Guid deckId, string question, string answer,
            int repetitions = 0, int correctAnswers = 0, DateTime lastRepeat = default)
            : this(Guid.Empty, deckId, question, answer, repetitions, correctAnswers, lastRepeat)
        {
        }

        [BsonConstructor]
        public CardEntity(Guid id, Guid deckId, string question, string answer, int repetitions,
            int correctAnswers, DateTime lastRepeat) : this(id, deckId, question, answer)
        {
            Repetitions = repetitions;
            CorrectAnswers = correctAnswers;
            LastRepeat = lastRepeat;
        }

        [BsonConstructor]
        public CardEntity(Guid id, Guid deckId, string question, string answer)
        {
            Id = id;
            DeckId = deckId;
            Question = question;
            Answer = answer;
        }
    }
}