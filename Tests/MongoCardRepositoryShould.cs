using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using MongoDB.Driver;
using NaturalSelectedCards.Data;
using NaturalSelectedCards.Data.Entities;
using NaturalSelectedCards.Data.Repositories;
using NaturalSelectedCards.Models.Settings;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class MongoCardRepositoryShould
    {
        private const string DatabaseName = "flashcards-tests";

        private static readonly Guid CommonDeckId = Guid.NewGuid();

        private static readonly CardEntity[] Cards =
        {
            new CardEntity(Guid.NewGuid(), "q", "a"),
            new CardEntity(CommonDeckId, "q", "a"),
            new CardEntity(CommonDeckId, "q", "a")
        };

        private IMongoCollection<CardEntity> _collection;
        private MongoCardRepository _repository;

        [OneTimeSetUp]
        public void SetUpOnce()
        {
            var builder = new MongoDatabaseBuilder(new DatabaseSettings {DatabaseName = DatabaseName});
            var database = builder.Build();
            _collection = database.GetCollection<CardEntity>(MongoCardRepository.CollectionName);
            _repository = new MongoCardRepository(database);
        }

        [SetUp]
        public void SetUp()
        {
            _collection.InsertMany(Cards);
        }

        [Test]
        public async Task GetCardsByDeckAsync_ReturnsEmptyList_WhenNoDecks()
        {
            var result = await _repository.GetCardsByDeckAsync(Guid.NewGuid());
            result.Should().BeEmpty();
        }

        [Test]
        public async Task GetCardsByDeckAsync_ReturnsNonEmptyList_WhenHaveCards()
        {
            var expected = Cards.Where(d => d.DeckId == CommonDeckId);

            var actual = await _repository.GetCardsByDeckAsync(CommonDeckId);

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task FindByIdAsync_ReturnsDeck_WhenItExists()
        {
            var expected = Cards[0];

            var actual = await _repository.FindByIdAsync(expected.Id);

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task FindByIdAsync_ReturnsNull_WhenItDoesNotExist()
        {
            var result = await _repository.FindByIdAsync(Guid.NewGuid());

            result.Should().BeNull();
        }

        [Test]
        public async Task InsertAsync_SetsNewId()
        {
            var card = new CardEntity(Guid.Empty, "?", "!");

            await _repository.InsertAsync(card);

            card.Id.Should().NotBeEmpty();
        }

        [Test]
        public async Task InsertAsync_ReturnsTheSameObject()
        {
            var expected = new CardEntity(Guid.Empty, "?", "!");

            var actual = await _repository.InsertAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task InsertAsync_SavesCard()
        {
            var expected = new CardEntity(Guid.NewGuid(), "?", "!");

            await _repository.InsertAsync(expected);

            var actual = await _collection.Find(d => d.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected);
        }
        
        [Test]
        public async Task UpdateAsync_ReturnsTheSameObject()
        {
            var expected = Cards[0];

            var actual = await _repository.UpdateAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task UpdateAsync_ChangesCard()
        {
            var old = Cards[0];
            var expected = new CardEntity(old.Id, old.DeckId, old.Question, old.Answer, 
                old.Repetitions + 1, old.CorrectAnswers, DateTime.UtcNow);

            await _repository.UpdateAsync(expected);

            var actual = await _collection.Find(d => d.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected, options => options.Using<DateTime>(
                ctx => ctx.Subject.Should().BeCloseTo(expected.LastRepeat)).WhenTypeIs<DateTime>());
        }

        [Test]
        public async Task DeleteAsync_RemovesCard()
        {
            var deleted = Cards[0];

            await _repository.DeleteAsync(deleted.Id);

            var result = await _collection.Find(d => d.Id == deleted.Id).FirstOrDefaultAsync();
            result.Should().BeNull();
        }

        [TearDown]
        public void TearDown()
        {
            _collection.DeleteMany(_ => true);
        }

        [OneTimeTearDown]
        public void TearDownOnce()
        {
            _collection.Database.Client.DropDatabase(DatabaseName);
        }
    }
}