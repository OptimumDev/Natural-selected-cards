using System.ComponentModel.DataAnnotations;

namespace NaturalSelectedCards.Models.Responses
{
    public class UserInfoResponse
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        public string PhotoUrl { get; set; }
    }
}