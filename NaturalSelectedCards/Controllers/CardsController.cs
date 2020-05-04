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
        [HttpGet("/{cardId}")]
        public ActionResult<CardResponse> GetCard([FromRoute] Guid cardId)
        {
            return Ok(new CardResponse());
        }

        [HttpPost]
        public ActionResult<Guid> CreateCard()
        {
            return Guid.NewGuid();
        }

        [HttpDelete("/{cardId}")]
        public IActionResult DeleteCard([FromRoute] Guid cardId)
        {
            return Ok();
        }
        
        [HttpPut("/{cardId}")]
        public IActionResult UpdateCard([FromRoute] Guid cardId, [FromBody] CardRequest card)
        {
            return Ok();
        }
        
        [HttpPost("/{cardId}/answer")]
        public IActionResult AnswerCard([FromRoute] Guid cardId, [FromBody] bool isCorrect) // мб не сработает, надо тестить
        {
            return Ok();
        }
    }
}