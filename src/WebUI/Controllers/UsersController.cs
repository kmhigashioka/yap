using Application.Common.Dtos;
using Application.Users.Commands;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    [Route("api/Users")]
    [Produces("application/json")]
    public class UsersController: ApiController
    {
        [HttpPost]
        [ProducesResponseType(typeof(ApplicationUserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] NewUserCommand request)
        {
            var result = await Mediator.Send(request);
            return Created("GetUser", result);
        }
    }
}
