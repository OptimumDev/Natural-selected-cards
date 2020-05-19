using System;
using System.ComponentModel.DataAnnotations;

namespace NaturalSelectedCards.Models.Requests
{
    public class CreateCardRequest
    {
        [Required] public Guid DeckId { get; set; } 
    }
}