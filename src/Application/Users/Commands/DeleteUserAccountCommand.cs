using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public class DeleteUserAccountCommand : IRequest
    {
        public int AccountId { get; set; }
        public string UserId { get; set; }
    }

    public class DeleteUserAccountCommandHandler : IRequestHandler<DeleteUserAccountCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteUserAccountCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<Unit> Handle(DeleteUserAccountCommand request, CancellationToken cancellationToken)
        {
            var account = _context.Accounts
                .Include(a => a.User)
                .Include(a => a.Transactions)
                .FirstOrDefault(a => a.User.Id == request.UserId && a.Id == request.AccountId);
            if (account == null)
            {
                throw new BadRequestException("User / Account does not exists.");
            }

            account.Transactions.ForEach(t => _context.Transactions.Remove(t));
            _context.Accounts.Remove(account);
            _context.SaveChanges();

            return Unit.Task;
        }
    }
}
