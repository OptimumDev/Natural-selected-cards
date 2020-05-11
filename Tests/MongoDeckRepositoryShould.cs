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
    public class MongoDeckRepositoryShould
    {
        private const string DatabaseName = "flashcards-tests";

        private static readonly Guid CommonUserId = Guid.NewGuid();

        private static readonly DeckEntity[] Decks =
        {
            new DeckEntity(Guid.NewGuid(), "deck"), 
            new DeckEntity(CommonUserId, "deck 1"), 
            new DeckEntity(CommonUserId, "deck 2"), 
            new DeckEntity(Guid.Empty, "standard 1"), 
            new DeckEntity(Guid.Empty, "standard 2")
        };

        private IMongoCollection<DeckEntity> _collection;
        private MongoDeckRepository _repository;

        [OneTimeSetUp]
        public void SetUpOnce()
        {
            var builder = new MongoDatabaseBuilder(new DatabaseSettings {DatabaseName = DatabaseName});
            var database = builder.Build();
            _collection = database.GetCollection<DeckEntity>(MongoDeckRepository.CollectionName);
            _repository = new MongoDeckRepository(database);
        }

        [SetUp]
        public void SetUp()
        {
            _collection.InsertMany(Decks);
        }

        [Test]
        public async Task GetUserDeckAsync_ReturnsEmptyList_WhenNoDecks()
        {
            var result = await _repository.GetUserDecksAsync(Guid.NewGuid());
            result.Should().BeEmpty();
        }

        [Test]
        public async Task GetUserDecksAsync_ReturnsNonEmptyList_WhenHaveDecks()
        {
            var expected = Decks.Where(d => d.UserId == CommonUserId);

            var actual = await _repository.GetUserDecksAsync(CommonUserId);

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task GetStandardDecksAsync_ReturnsStandardDecks()
        {
            var expected = Decks.Where(d => d.UserId == Guid.Empty);

            var actual = await _repository.GetStandardDecksAsync();

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task FindByIdAsync_ReturnsDeck_WhenItExists()
        {
            var expected = Decks[0];

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
            var deck = new DeckEntity(Guid.Empty, "d");

            await _repository.InsertAsync(deck);

            deck.Id.Should().NotBeEmpty();
        }

        [Test]
        public async Task InsertAsync_ReturnsTheSameObject()
        {
            var expected = new DeckEntity(Guid.Empty, "d");

            var actual = await _repository.InsertAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task InsertAsync_SavesDeck()
        {
            var expected = new DeckEntity(Guid.NewGuid(), "new deck");

            await _repository.InsertAsync(expected);

            var actual = await _collection.Find(d => d.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected);
        }
        
        [Test]
        public async Task UpdateAsync_ReturnsTheSameObject()
        {
            var expected = Decks[0];

            var actual = await _repository.UpdateAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task UpdateAsync_ChangesDeck()
        {
            var old = Decks[0];
            var expected = new DeckEntity(old.Id, old.UserId, "updated deck");

            await _repository.UpdateAsync(expected);

            var actual = await _collection.Find(d => d.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task DeleteAsync_RemovesDeck()
        {
            var deleted = Decks[0];
            
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