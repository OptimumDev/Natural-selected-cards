using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NaturalSelectedCards.Models.Requests;
using NaturalSelectedCards.Models.Responses;

namespace NaturalSelectedCards.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/v1/decks")]
    public class DecksController : Controller
    {
        [HttpGet("/{deckId}")]
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
        
        [HttpPut("/{deckId}")]
        public ActionResult<DeckResponse> UpdateDeck([FromRoute] Guid deckId, [FromBody] DeckRequest deck)
        {
            return Ok();
        }
        
        [HttpPost]
        public IActionResult CreateDeck([FromBody] DeckRequest deck)
        {
            return Ok();
        }
        
        [HttpDelete("/{deckId}")]
        public IActionResult DeleteDeck([FromRoute] Guid deckId)
        {
            return Ok();
        }

        
        [HttpGet()]
        public ActionResult<ICollection<DeckResponse>> GetDecks()
        {
            var userId = Guid.NewGuid();

            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "зачем жить?"},
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета грязи"},
            });
        }
        
        [HttpGet("/standard")]
        public ActionResult<ICollection<DeckResponse>> GetStandardDecks()
        {
            var userId = Guid.Empty;

            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета"},
                new DeckResponse {Id = Guid.NewGuid(), Title = "животные"}
            });
        }

        [HttpPost("/{deckId}/copy")]
        public IActionResult AddStandardDeckToUser([FromRoute] Guid deckId, [FromBody] Guid userId) // не помню сработает ли
        {
            return Ok();
        }


        [HttpDelete("/{deckId}/game")]
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