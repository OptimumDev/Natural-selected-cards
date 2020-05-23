using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Data.Repositories;
using NaturalSelectedCards.Logic.Managers;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;
using NaturalSelectedCards.Utils.Constants;
using NaturalSelectedCards.Utils.Extensions;

namespace NaturalSelectedCards.Controllers
{
    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Google)]
    [ApiController]
    [Route("api/v1/decks")]
    public class DecksController : Controller
    {
        private readonly IDeckManager manager;
        private readonly IDeckRepository deckRepository;

        public DecksController(IDeckManager manager, IDeckRepository deckRepository)
        {
            this.manager = manager;
            this.deckRepository = deckRepository;
        }

        /// <summary>
        /// Получение всей колоды (карточек)
        /// </summary>
        /// <param name="deckId"></param>
        /// <response code="200">Все карты колоды</response>
        /// <response code="404">Нет такой колоды</response>
        /// <response code="500">Ошибка при получении колоды</response>
        /// <returns></returns>
        [HttpGet("{deckId}")]
        public async Task<ActionResult<ICollection<CardResponse>>> GetDeck([FromRoute] Guid deckId)
        {
            try
            {
                var userId = this.GetUserId();
                if (!await deckRepository.IsUsersDeckAsync(deckId, userId).ConfigureAwait(false))
                    return Forbid();
                
                var deck = await manager.GetAllCardsFromDeckAsync(deckId).ConfigureAwait(false);
                if (deck == null)
                    return NotFound();

                return Ok(deck);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
;        }
        
        /// <summary>
        /// Обновление колоды (названия)
        /// </summary>
        /// <param name="deckId"></param>
        /// <param name="updateDeck"></param>
        /// <response code="200">Колода обновлена</response>
        /// <response code="404">Нет такой колоды</response>
        /// <response code="500">Ошибка при обновлении колоды</response>
        /// <returns></returns>
        [HttpPut("{deckId}")]
        public async Task<IActionResult> UpdateDeck([FromRoute] Guid deckId, [FromBody] UpdateDeckRequest updateDeck)
        {
            try
            {
                var userId = this.GetUserId();
                if (!await deckRepository.IsUsersDeckAsync(deckId, userId).ConfigureAwait(false))
                    return Forbid();
                
                var result = await manager.UpdateDeckTitleAsync(deckId, updateDeck.Title).ConfigureAwait(false);

                if (result)
                    return Ok();
                return NotFound();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Создание новой колоды (пустой)
        /// </summary>
        /// <param name="request"></param>
        /// <response code="201">Все карты колоды</response>
        /// <response code="500">Ошибка при создании колоды</response>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateDeck()
        {
            try
            {
                var userId = this.GetUserId();
                var deckId = await manager.AddDeckAsync(userId).ConfigureAwait(false);

                if (deckId == null)
                    return StatusCode(500);
                return Created($"api/v1/decks/{deckId.ToString()}", deckId);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Удаление колоды
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns></returns>
        [HttpDelete("{deckId}")]
        public async Task<IActionResult> DeleteDeck([FromRoute] Guid deckId)
        {
            try
            {
                var userId = this.GetUserId();
                if (!await deckRepository.IsUsersDeckAsync(deckId, userId).ConfigureAwait(false))
                    return Forbid();
                
                var result = await manager.DeleteDeckAsync(deckId).ConfigureAwait(false);
            
                return result ? Ok() : StatusCode(500);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Получение информации о колодах пользователя
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet()]
        public async Task<ActionResult<ICollection<DeckResponse>>> GetDecks()
        {
            try
            {
                var userId = this.GetUserId();
                var decks = await manager.GetDecksAsync(userId).ConfigureAwait(false);
            
                if (decks == null)
                    return NotFound();
                return Ok(decks.Select(DeckResponse.FromDeck));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        /// <summary>
        /// Получение информации о стандартных колодах
        /// </summary>
        /// <returns></returns>
        [HttpGet("standard")]
        public async Task<ActionResult<ICollection<DeckResponse>>> GetStandardDecks()
        {
            try
            {
                var standardDecks = await manager.GetStandardDecksAsync().ConfigureAwait(false);

                if (standardDecks == null)
                    return StatusCode(500);
                return Ok(standardDecks.Select(DeckResponse.FromDeck));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Добавление другой колоды в коллекцию пользователя
        /// </summary>
        /// <param name="deckId"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("{deckId}/copy")]
        public async Task<IActionResult> CopyDeck([FromRoute] Guid deckId)
        {
            try
            {
                var userId = this.GetUserId();
                var result = await manager.CopyDeckAsync(userId, deckId).ConfigureAwait(false);

                if (result)
                    return Ok();
                return StatusCode(500);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        /// <summary>
        /// Получение тренировочного набора карт
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns></returns>
        [HttpGet("{deckId}/game")]
        public async Task<ActionResult<ICollection<CardResponse>>> GetGameDeck([FromRoute] Guid deckId)
        {
            try
            {
                var userId = this.GetUserId();
                if (!await deckRepository.IsUsersOrStandardDeckAsync(deckId, userId).ConfigureAwait(false))
                    return Forbid();
                
                var gameDeck = await manager.GetCardsForGameAsync(deckId).ConfigureAwait(false);

                if (gameDeck == null)
                    return NotFound();
                return Ok(gameDeck);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}