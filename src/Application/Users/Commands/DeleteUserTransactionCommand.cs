using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands
{
    public class DeleteUserTransactionCommand : IRequest
    {
        public int TransactionId { get; set; }
        public string UserId { get; set; }
    }

    public class DeleteUserTransactionCommandHandler: IRequestHandler<DeleteUserTransactionCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public DeleteUserTransactionCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteUserTransactionCommand request, CancellationToken cancellationToken)
        {
            var transaction = await _dbContext.Transactions
                .Include(t => t.Account)
                .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(t => t.Id == request.TransactionId && t.Account.User.Id == request.UserId, cancellationToken: cancellationToken);

            if (transaction == null)
            {
                throw new NotFoundException("Transaction does not exist.");
            }

            if (transaction.Type == TransactionType.Expense)
            {
                transaction.Account.Balance += transaction.Amount;
            }
            else
            {
                transaction.Account.Balance -= transaction.Amount;
            }
            _dbContext.Transactions.Remove(transaction);
            _dbContext.SaveChanges();

            return Unit.Value;
        }
    }
}
