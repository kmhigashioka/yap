using Application.Common.Dtos;
using Application.Users.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    [Authorize]
    [Route("api/guests")]
    [Produces("application/json")]
    public class GuestsController : ApiController
    {
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ApplicationUserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] NewUserCommand request)
        {
            request.IsGuest = true;
            var result = await Mediator.Send(request);
            return Created(string.Empty, result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] ConvertGuestToUserCommand request)
        {
            await Mediator.Send(request);
            return NoContent();
        }
    }
}
