using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Omu.ValueInjecter;

namespace Application.Users.Commands
{
    public class NewUserTransactionsCommand : IRequest<List<TransactionDto>>
    {
        public string UserId { get; set; }
        public List<TransactionDto> Transactions { get; set; }
        public int AccountId { get; set; }
    }

    public class NewUserTransactionsCommandHandler: IRequestHandler<NewUserTransactionsCommand, List<TransactionDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public NewUserTransactionsCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<TransactionDto>> Handle(NewUserTransactionsCommand request, CancellationToken cancellationToken)
        {
            var account = _dbContext.Accounts.FirstOrDefault(a => a.Id == request.AccountId);
            if (account == null)
            {
                throw new NotFoundException("This account does not exist.");
            }

            var categoryIds = request.Transactions.Select(t => t.Category.Id).ToList();
            var categories = _dbContext.TransactionCategories.Where(tc => categoryIds.Contains(tc.Id)).ToList();

            var transactions = request.Transactions.Select(t =>
            {
                var transaction = Mapper.Map<Transaction>(t);
                transaction.Category = categories.First(c => c.Id == t.Category.Id);
                transaction.Account = account;
                if (transaction.Type == TransactionType.Income)
                {
                    account.Balance += t.Amount;
                }
                else
                {
                    account.Balance -= t.Amount;
                }
                return transaction;
            }).ToList();

            await _dbContext.Transactions.AddRangeAsync(transactions, cancellationToken);

            _dbContext.SaveChanges();

            return request.Transactions
                .ToList()
                .Select(t =>
                {
                    var dto = Mapper.Map<TransactionDto>(t);
                    dto.Category = Mapper.Map<TransactionCategoryDto>(t.Category);
                    return dto;
                })
                .ToList();
        }
    }
}
