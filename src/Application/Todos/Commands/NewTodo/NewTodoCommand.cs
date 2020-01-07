using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Domain.Entities;
using Omu.ValueInjecter;

namespace Application.Todos.Commands.NewTodo
{
    public class NewTodoCommand : IRequest<TodoDto>
    {
        public TodoDto Todo { get; set; }
    }

    public class NewTodoCommandHandler : IRequestHandler<NewTodoCommand, TodoDto>
    {
        private readonly IApplicationDbContext _context;

        public NewTodoCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public Task<TodoDto> Handle(NewTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = Mapper.Map<Todo>(request.Todo);
            _context.Todos.Add(todo);
            _context.SaveChanges();

            return Task.FromResult(Mapper.Map<TodoDto>(todo));
        }
    }
}
