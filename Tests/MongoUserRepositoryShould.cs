using System;
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
    public class MongoUserRepositoryShould
    {
        private const string DatabaseName = "flashcards-tests";
        
        private static readonly UserEntity[] Users =
        {
            new UserEntity("google-id-1"), 
            new UserEntity("google-id-2") 
        };
        
        private IMongoCollection<UserEntity> _collection;
        private MongoUserRepository _repository;
        
        [OneTimeSetUp]
        public void SetUpOnce()
        {
            var builder = new MongoDatabaseBuilder(new DatabaseSettings {DatabaseName = DatabaseName});
            var database = builder.Build();
            _collection = database.GetCollection<UserEntity>(MongoUserRepository.CollectionName);
            _repository = new MongoUserRepository(database);
        }

        [SetUp]
        public void SetUp()
        {
            _collection.InsertMany(Users);
        }
        
        [Test]
        public async Task FindByIdAsync_ReturnsUser_WhenItExists()
        {
            var expected = Users[0];

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
        public async Task FindByGoogleIdAsync_ReturnsUser_WhenItExists()
        {
            var expected = Users[0];

            var actual = await _repository.FindByGoogleIdAsync(expected.GoogleId);

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task FindByGoogleIdAsync_ReturnsNull_WhenItDoesNotExist()
        {
            var result = await _repository.FindByGoogleIdAsync("this-id-does-not-exist");

            result.Should().BeNull();
        }

        [Test]
        public async Task InsertAsync_SetsNewId()
        {
            var user = new UserEntity("google-id");

            await _repository.InsertAsync(user);

            user.Id.Should().NotBeEmpty();
        }

        [Test]
        public async Task InsertAsync_ReturnsTheSameObject()
        {
            var expected = new UserEntity("google-id");

            var actual = await _repository.InsertAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task InsertAsync_SavesUser()
        {
            var expected = new UserEntity("google-id");

            await _repository.InsertAsync(expected);

            var actual = await _collection.Find(u => u.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected);
        }
        
        [Test]
        public async Task UpdateAsync_ReturnsTheSameObject()
        {
            var expected = Users[0];

            var actual = await _repository.UpdateAsync(expected);

            actual.Should().Be(expected);
        }

        [Test]
        public async Task UpdateAsync_ChangesUser()
        {
            var old = Users[0];
            var expected = new UserEntity(old.Id, "new-google-id");

            await _repository.UpdateAsync(expected);

            var actual = await _collection.Find(u => u.Id == expected.Id).FirstOrDefaultAsync();
            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public async Task DeleteAsync_RemovesUser()
        {
            var deleted = Users[0];
            
            await _repository.DeleteAsync(deleted.Id);

            var result = await _collection.Find(u => u.Id == deleted.Id).FirstOrDefaultAsync();
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
            _collection.Database.DropCollection(MongoUserRepository.CollectionName);
            _collection.Database.Client.DropDatabase(DatabaseName);
        }
    }
}