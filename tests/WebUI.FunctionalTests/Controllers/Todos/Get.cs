using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Application.Todos.Queries.GetTodos;
using Domain.Entities;
using WebUI.Controllers;
using Xunit;

namespace WebUI.FunctionalTests.Controllers.Todos
{
    public class Get
    {
        [Fact]
        public void Get_Todos()
        {
            var mockMediator = new Mock<IMediator>();
            mockMediator
                .Setup(t => t.Send(It.IsAny<GetTodosQuery>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(new List<Todo> {
                    new Todo
                    {
                        Id = 1000,
                        Task = "Write unit test",
                        Done = true
                    }
                }));
            var controller = new TodosController(mockMediator.Object);


            var result = controller.GetTodos();


            var okResult = Assert.IsType<OkObjectResult>(result);
            var todos = Assert.IsType<List<Todo>>(okResult.Value);
            Assert.Single(todos);
        }
    }
}
