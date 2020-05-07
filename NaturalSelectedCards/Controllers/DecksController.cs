using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;

namespace NaturalSelectedCards.Controllers
{
    [Authorize(AuthenticationSchemes = "Google")]
    [ApiController]
    [Route("api/v1/decks")]
    public class DecksController : Controller
    {
        /// <summary>
        /// Получение всей колоды (карточек)
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns></returns>
        [HttpGet("{deckId}")]
        public ActionResult<ICollection<CardResponse>> GetDeck([FromRoute] Guid deckId)
        {
            var response = Enumerable.Range(0, 5)
                .Select(i => new CardResponse
                {
                    Answer = $"Ответ №{i.ToString()}",
                    Id = Guid.NewGuid(),
                    Question = $"Вопрос №{i.ToString()}"
                });

            return Ok(response);
;        }
        
        /// <summary>
        /// Обновление колоды (названия)
        /// </summary>
        /// <param name="deckId"></param>
        /// <param name="updateDeck"></param>
        /// <returns></returns>
        [HttpPut("{deckId}")]
        public ActionResult<DeckResponse> UpdateDeck([FromRoute] Guid deckId, [FromBody] UpdateDeckRequest updateDeck)
        {
            return Ok();
        }
        
        /// <summary>
        /// Создание новой колоды (пустой)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Guid> CreateDeck([FromBody] CreateDeckRequest request)
        {
            // Created
            return Ok();
        }
        
        /// <summary>
        /// Удаление колоды
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns></returns>
        [HttpDelete("{deckId}")]
        public IActionResult DeleteDeck([FromRoute] Guid deckId)
        {
            return Ok();
        }

        /// <summary>
        /// Получение информации о колодах пользователя
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet()]
        public ActionResult<ICollection<DeckResponse>> GetDecks([FromQuery] Guid userId)
        {
            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "зачем жить?", Rating = 0.1, CardsCount = 3, LastRepetition = DateTime.Now},
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета грязи", Rating = 0.8, CardsCount = 3, LastRepetition = DateTime.Now.AddDays(-3)},
            });
        }
        
        /// <summary>
        /// Получение информации о стандартных колодах
        /// </summary>
        /// <returns></returns>
        [HttpGet("standard")]
        public ActionResult<ICollection<DeckResponse>> GetStandardDecks()
        {
            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета", Rating = 0, CardsCount = 3, PlayedCount = 0, LastRepetition = null},
                new DeckResponse {Id = Guid.NewGuid(), Title = "животные", Rating = 0, CardsCount = 3, PlayedCount = 0, LastRepetition = null}
            });
        }

        /// <summary>
        /// Добавление другой колоды в коллекцию пользователя
        /// </summary>
        /// <param name="deckId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("{deckId}/copy")]
        public IActionResult CopyDeck([FromRoute] Guid deckId, [FromBody] CopyDeckRequest request)
        {
            return Ok();
        }

        /// <summary>
        /// Получение тренировочного набора карт
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns></returns>
        [HttpDelete("{deckId}/game")]
        public ActionResult<ICollection<CardResponse>> GetGameDeck([FromRoute] Guid deckId)
        {
            var response = Enumerable.Range(0, 5)
                .Select(i => new CardResponse
                {
                    Answer = $"Ответ №{i.ToString()}",
                    Id = Guid.NewGuid(),
                    Question = $"Вопрос №{i.ToString()}"
                });

            return Ok(response);
        }
    }
}