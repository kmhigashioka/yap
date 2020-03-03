using System.Collections.Generic;
using Application.Common.Dtos;
using Application.Users.Commands;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users.Queries;
using Microsoft.AspNetCore.Authorization;

namespace WebUI.Controllers
{
    [Route("api/Users")]
    [Produces("application/json")]
    public class UsersController: ApiController
    {
        private readonly ICurrentUserService _currentUserService;

        public UsersController(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ApplicationUserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] NewUserCommand request)
        {
            var result = await Mediator.Send(request);
            return Created("GetUser", result);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var response = await Mediator.Send(new GetMeQuery
            {
                CurrentUserId = _currentUserService.UserId
            });
            return Ok(response);
        }

        [Authorize]
        [HttpGet("accounts")]
        [ProducesResponseType(typeof(List<AccountDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAccounts([FromQuery] GetUserAccountsQuery request)
        {
            request.UserId = _currentUserService.UserId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }
    }
}
