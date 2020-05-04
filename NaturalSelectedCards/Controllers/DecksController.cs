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
        public ActionResult<DeckResponse> UpdateDeck([FromRoute] Guid deckId, [FromBody] string title)
        {
            return Ok();
        }
        
        [HttpPost]
        public ActionResult<Guid> CreateDeck([FromBody] Guid userId)
        {
            return Ok();
        }
        
        [HttpDelete("/{deckId}")]
        public IActionResult DeleteDeck([FromRoute] Guid deckId)
        {
            return Ok();
        }

        
        [HttpGet()]
        public ActionResult<ICollection<DeckResponse>> GetDecks([FromQuery] Guid userId)
        {
            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "зачем жить?", Rating = 0.1, CardsCount = 3, LastRepetition = DateTime.Now},
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета грязи", Rating = 0.8, CardsCount = 3, LastRepetition = DateTime.Now.AddDays(-3)},
            });
        }
        
        [HttpGet("/standard")]
        public ActionResult<ICollection<DeckResponse>> GetStandardDecks()
        {
            return Ok(new[]
            {
                new DeckResponse {Id = Guid.NewGuid(), Title = "цвета", Rating = 0, CardsCount = 3, PlayedCount = 0, LastRepetition = null},
                new DeckResponse {Id = Guid.NewGuid(), Title = "животные", Rating = 0, CardsCount = 3, PlayedCount = 0, LastRepetition = null}
            });
        }

        [HttpPost("/{deckId}/copy")]
        public IActionResult AddStandardDeckToUser([FromRoute] Guid deckId, [FromBody] Guid userId)
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