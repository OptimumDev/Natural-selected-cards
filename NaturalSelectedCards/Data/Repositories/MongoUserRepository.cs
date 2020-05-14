using System;
using System.Threading.Tasks;
using MongoDB.Driver;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public class MongoUserRepository : IUserRepository
    {
        public const string CollectionName = "users";
        
        private readonly IMongoCollection<UserEntity> _userCollection;

        public MongoUserRepository(IMongoDatabase database)
        {
            _userCollection = database.GetCollection<UserEntity>(CollectionName);
            _userCollection.Indexes.CreateOne(new CreateIndexModel<UserEntity>(
                Builders<UserEntity>.IndexKeys.Hashed(u => u.GoogleId)
            ));
        }
        
        public Task<UserEntity> FindByIdAsync(Guid userId)
        {
            return _userCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
        }

        public Task<UserEntity> FindByGoogleIdAsync(string googleId)
        {
            return _userCollection.Find(u => u.GoogleId == googleId).FirstOrDefaultAsync();
        }

        public async Task<UserEntity> InsertAsync(UserEntity user)
        {
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public async Task<UserEntity> UpdateAsync(UserEntity user)
        {
            await _userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            return user;
        }

        public Task DeleteAsync(Guid userId)
        {
            return _userCollection.DeleteOneAsync(u => u.Id == userId);
        }
    }
}