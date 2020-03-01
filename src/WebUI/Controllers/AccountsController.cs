using System.Threading.Tasks;
using Application.Accounts.Commands;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Accounts")]
    public class AccountsController : ApiController
    {
        private readonly ICurrentUserService _currentUserService;

        public AccountsController(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Post([FromBody] NewAccountCommand request)
        {
            request.UserId = _currentUserService.UserId;
            var response = await Mediator.Send(request);
            return Created(string.Empty, response);
        }
    }
}
