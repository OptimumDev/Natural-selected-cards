using System;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Entities;

namespace NaturalSelectedCards.Data.Repositories
{
    public interface IUserRepository
    {
        Task<UserEntity> FindByIdAsync(Guid userId);
        Task<UserEntity> FindByGoogleIdAsync(string googleId);
        Task<UserEntity> InsertAsync(UserEntity user);
        Task<UserEntity> UpdateAsync(UserEntity user);
        Task DeleteAsync(Guid userId);
    }
}