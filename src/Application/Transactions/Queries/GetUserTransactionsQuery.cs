using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.Transactions.Queries
{
    public class GetUserTransactionsQuery : IRequest<List<TransactionDto>>
    {
        public string UserId { get; set; }
        public int? AccountId { get; set; }
    }

    public class GetTransactionsQueryHandler: IRequestHandler<GetUserTransactionsQuery, List<TransactionDto>>
    {
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _dbContext;

        public GetTransactionsQueryHandler(IIdentityService identityService, IApplicationDbContext dbContext)
        {
            _identityService = identityService;
            _dbContext = dbContext;
        }

        public async Task<List<TransactionDto>> Handle(GetUserTransactionsQuery request, CancellationToken cancellationToken)
        {
            var accountQuery = _dbContext.Accounts
                .Include(a => a.Transactions)
                .ThenInclude(t => t.Category)
                .Include(a => a.User)
                .Where(a => a.User.Id == request.UserId);

            if (request.AccountId.HasValue)
            {
                accountQuery = accountQuery.Where(a => a.Id == request.AccountId.Value);
            }

            var accounts = await accountQuery
                .ToListAsync(cancellationToken);

            var transactions = accounts.SelectMany(a => a.Transactions).ToList();

            var transactionsDto = transactions
                .Select(t =>
                {
                    var transactionDto = Mapper.Map<TransactionDto>(t);
                    transactionDto.Category = Mapper.Map<TransactionCategoryDto>(t.Category);
                    return transactionDto;
                })
                .ToList();
            return transactionsDto;
        }
    }
}
