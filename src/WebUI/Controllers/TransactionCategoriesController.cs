using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Application.Common.Dtos;
using Application.TransactionCategories.Queries;

namespace WebUI.Controllers
{
    [Route("api/TransactionCategories")]
    [Produces("application/json")]
    public class TransactionCategoriesController : ApiController
    {
        [HttpGet]
        [ProducesResponseType(typeof(List<TransactionCategoryDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromQuery] GetTransactionCategoriesQuery request)
        {
            var result = await Mediator.Send(request);
            return Ok(result);
        }
    }
}
