using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace NaturalSelectedCards.Utils.Extensions
{
    public static class ControllerExtensions
    {
        public static Guid GetUserId(this Controller controller) => 
            Guid.Parse(controller.User.Claims.GetValueByType(ClaimTypes.NameIdentifier));
    }
}