using System;
using System.ComponentModel.DataAnnotations;

namespace NaturalSelectedCards.Models.Requests
{
    public class CopyDeckRequest
    {
        [Required] public Guid UserId { get; set; }
    }
}