using System.Collections.Generic;
using Application.Common.Dtos;
using Application.Users.Commands;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Transactions.Queries;
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

        [Authorize]
        [HttpGet("transactions")]
        [ProducesResponseType(typeof(List<TransactionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTransactions([FromQuery] GetUserTransactionsQuery request)
        {
            request.UserId = _currentUserService.UserId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }

        [Authorize]
        [HttpPost("transactions")]
        [ProducesResponseType(typeof(List<TransactionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> PostTransactions([FromBody] NewUserTransactionsCommand request, [FromQuery] int accountId)
        {
            request.UserId = _currentUserService.UserId;
            request.AccountId = accountId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("transactions/{transactionId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteTransaction(int transactionId)
        {
            var request = new DeleteUserTransactionCommand
            {
                TransactionId = transactionId,
                UserId = _currentUserService.UserId
            };
            await Mediator.Send(request);
            return NoContent();
        }

        [Authorize]
        [HttpPut("transactions")]
        [ProducesResponseType(typeof(List<TransactionDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> PutTransactions([FromBody] UpdateUserTransactionCommand request)
        {
            request.UserId = _currentUserService.UserId;
            var response = await Mediator.Send(request);
            return Ok(response);
        }
    }
}
