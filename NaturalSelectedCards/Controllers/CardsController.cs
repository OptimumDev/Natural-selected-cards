using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Data.Repositories;
using NaturalSelectedCards.Logic.Managers;
using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;
using NaturalSelectedCards.Utils.Constants;
using NaturalSelectedCards.Utils.Extensions;

namespace NaturalSelectedCards.Controllers
{
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Google)]
    [ApiController]
    [Route("api/v1/cards")]
    public class CardsController : Controller
    {
        private readonly IDeckManager manager;
        private readonly IDeckRepository deckRepository;
        private readonly ICardRepository cardRepository;

        public CardsController(IDeckManager manager, IDeckRepository deckRepository, ICardRepository cardRepository)
        {
            this.manager = manager;
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
        }

        /// <summary>
        /// Создание новой карты (пустой)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateCard([FromBody] CreateCardRequest request)
        {
            if (!await IsUsersDeckAsync(request.DeckId).ConfigureAwait(false))
                return Forbid();
            
            var result = await manager.AddCardAsync(request.DeckId).ConfigureAwait(false);

            if (result == null)
                return StatusCode(500);
            // Не совсем корректно отдавать Id, вместо карточки, но норм
            return Created($"api/v1/cards/{result.Value}", result.Value); 
        }

        /// <summary>
        /// Удаление карты
        /// </summary>
        /// <param name="cardId"></param>
        /// <returns></returns>
        [HttpDelete("{cardId}")]
        public async Task<IActionResult> DeleteCard([FromRoute] Guid cardId)
        {
            if (!await IsUsersCardAsync(cardId).ConfigureAwait(false))
                Forbid();
            
            var result = await manager.DeleteCardAsync(cardId).ConfigureAwait(false);
            
            if (result)
                return Ok();
            return StatusCode(500);
        }
        
        /// <summary>
        /// Обновление самой карты (вопроса и ответа)
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{cardId}")]
        public async Task<IActionResult> UpdateCard([FromRoute] Guid cardId, [FromBody] CardRequest request)
        {
            if (!await IsUsersCardAsync(cardId).ConfigureAwait(false))
                Forbid();
            
            var model = new CardModel
            {
                Id = cardId,
                Answer = request.Answer,
                Question = request.Question
            };

            var result = await manager.UpdateCardAsync(model).ConfigureAwait(false);

            if (result)
                return Ok();
            return StatusCode(500);
        }
        
        /// <summary>
        /// Обновление информации карты (верный/неверный ответ)
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="isCorrect"></param>
        /// <returns></returns>
        [HttpPost("{cardId}/answer")]
        public async Task<IActionResult> AnswerCard([FromRoute] Guid cardId, [FromBody] bool isCorrect)
        {
            if (!await IsUsersCardAsync(cardId).ConfigureAwait(false))
                Forbid();
            
            var result = await manager.UpdateCardKnowledgeAsync(cardId, isCorrect).ConfigureAwait(false);

            if (result)
                return Ok();
            return StatusCode(500);
        }

        private async Task<bool> IsUsersCardAsync(Guid cardId)
        {
            var card = cardRepository.FindByIdAsync(cardId).GetAwaiter().GetResult();

            return card != null && await IsUsersDeckAsync(card.DeckId).ConfigureAwait(false);
        }
        
        // не страшная и неизбежная копипаста
        private async Task<bool> IsUsersDeckAsync(Guid deckId)
        {
            var userId = GetUserId();
            var deck = await deckRepository.FindByIdAsync(deckId).ConfigureAwait(false);

            return deck != null && deck.UserId == userId;
        }
        
        private Guid GetUserId() => Guid.Parse(User.Claims.GetValueByType(ClaimTypes.NameIdentifier));
    }
}