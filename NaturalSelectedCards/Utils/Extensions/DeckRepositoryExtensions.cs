using System;
using System.Threading.Tasks;
using NaturalSelectedCards.Data.Repositories;

namespace NaturalSelectedCards.Utils.Extensions
{
    public static class DeckRepositoryExtensions
    {
        public static async Task<bool> IsUsersDeckAsync(this IDeckRepository repository, Guid deckId, Guid userId)
        {
            var deck = await repository.FindByIdAsync(deckId).ConfigureAwait(false);

            return deck != null && deck.UserId == userId;
        }
        
        public static async Task<bool> IsUsersOrStandardDeckAsync(this IDeckRepository repository, Guid deckId, Guid userId)
        {
            var deck = await repository.FindByIdAsync(deckId).ConfigureAwait(false);

            return deck != null && (deck.UserId == userId || deck.UserId == Guid.Empty);
        }
    }
}