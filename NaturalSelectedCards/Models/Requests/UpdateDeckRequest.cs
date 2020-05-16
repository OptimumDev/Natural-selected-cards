using System.ComponentModel.DataAnnotations;

namespace NaturalSelectedCards.Models.Requests
{
    public class UpdateDeckRequest
    {
        [Required(AllowEmptyStrings = false)] public string Title { get; set; }
    }
}