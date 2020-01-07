using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Application.Common.Interfaces;
using MediatR;
using Moq;
using Application.Todos.Commands.NewTodo;
using Application.Todos.Queries.GetTodos;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Application.Tests.Todos.Queries
{
    public class GetTodosQueryTests
    {
        [Fact]
        public void Get_Todos()
        {
            var mockContext = new Mock<IApplicationDbContext>();
            var mockDbSetTodos = new List<Todo>
            {
                new Todo
                {
                    Id = 1001,
                    Task = "Write a unit test",
                    Done = false
                },
                new Todo
                {
                    Id = 1002,
                    Task = "Write another unit test",
                    Done = true
                }
            };
            var mediator = BuildMediator(mockContext.Object);
            mockContext.Setup(t => t.Todos).Returns(MockDbSet(mockDbSetTodos).Object);


            var result = mediator.Send(new GetTodosQuery());


            Assert.Equal(2, result.Result.Count);
        }

        private static IMediator BuildMediator(IApplicationDbContext context)
        {
            var services = new ServiceCollection();

            services.AddScoped<ServiceFactory>(p => p.GetService);
            
            services.AddMediatR(typeof(NewTodoCommand).GetTypeInfo().Assembly);
            services.AddSingleton(context);

            var provider = services.BuildServiceProvider();

            return provider.GetRequiredService<IMediator>();
        }

        private Mock<DbSet<T>> MockDbSet<T>(IEnumerable<T> list) where T : class, new()
        {
            IQueryable<T> queryableList = list.AsQueryable();
            Mock<DbSet<T>> dbSetMock = new Mock<DbSet<T>>();
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Provider).Returns(queryableList.Provider);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.Expression).Returns(queryableList.Expression);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.ElementType).Returns(queryableList.ElementType);
            dbSetMock.As<IQueryable<T>>().Setup(x => x.GetEnumerator()).Returns(() => queryableList.GetEnumerator());
            //dbSetMock.Setup(x => x.Create()).Returns(new T());

            return dbSetMock;
        }
    }
}
