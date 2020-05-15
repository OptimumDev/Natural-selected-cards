using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Logic.Managers;
using NaturalSelectedCards.Logic.Models;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;
using NaturalSelectedCards.Utils.Constants;

namespace NaturalSelectedCards.Controllers
{
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Google)]
    [ApiController]
    [Route("api/v1/cards")]
    public class CardsController : Controller
    {
        private readonly IDeckManager manager;

        public CardsController(IDeckManager manager)
        {
            this.manager = manager;
        }

        /// <summary>
        /// Создание новой карты (пустой)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateCard([FromBody] CreateCardRequest request)
        {
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
        public async Task<ActionResult<CardResponse>> UpdateCard([FromRoute] Guid cardId, [FromBody] CardRequest request)
        {
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
            var result = await manager.UpdateCardKnowledgeAsync(cardId, isCorrect).ConfigureAwait(false);

            if (result)
                return Ok();
            return StatusCode(500);
        }
    }
}