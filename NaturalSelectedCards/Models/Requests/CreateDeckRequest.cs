using System;
using System.ComponentModel.DataAnnotations;

namespace NaturalSelectedCards.Models.Requests
{
    public class CreateDeckRequest
    {
        [Required] public Guid UserId { get; set; }
    }
}