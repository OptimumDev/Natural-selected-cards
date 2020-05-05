using System;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;

namespace NaturalSelectedCards.Controllers
{
    [ApiController]
    [Route("api/v1/cards")]
    public class CardsController : Controller
    {
        /// <summary>
        /// Получить карточку
        /// </summary>
        /// <param name="cardId"></param>
        /// <returns></returns>
        [HttpGet("{cardId}")]
        public ActionResult<CardResponse> GetCard([FromRoute] Guid cardId)
        {
            return Ok(new CardResponse());
        }

        /// <summary>
        /// Создание новой карты (пустой)
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Guid> CreateCard()
        {
            return Guid.NewGuid();
        }

        /// <summary>
        /// Удаление карты
        /// </summary>
        /// <param name="cardId"></param>
        /// <returns></returns>
        [HttpDelete("{cardId}")]
        public IActionResult DeleteCard([FromRoute] Guid cardId)
        {
            return Ok();
        }
        
        /// <summary>
        /// Обновление самой карты (вопроса и ответа)
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="card"></param>
        /// <returns></returns>
        [HttpPut("{cardId}")]
        public ActionResult<CardResponse> UpdateCard([FromRoute] Guid cardId, [FromBody] CardRequest card)
        {
            return Ok();
        }
        
        /// <summary>
        /// Обновление информации карты (верный/неверный ответ)
        /// </summary>
        /// <param name="cardId"></param>
        /// <param name="isCorrect"></param>
        /// <returns></returns>
        [HttpPost("{cardId}/answer")]
        public IActionResult AnswerCard([FromRoute] Guid cardId, [FromBody] bool isCorrect)
        {
            return Ok();
        }
    }
}