using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.TransactionCategories.Queries
{
    public class GetTransactionCategoriesQuery: IRequest<List<TransactionCategoryDto>>
    {
    }

    public class GetTransactionCategoriesQueryHandler: IRequestHandler<GetTransactionCategoriesQuery, List<TransactionCategoryDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetTransactionCategoriesQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<TransactionCategoryDto>> Handle(GetTransactionCategoriesQuery request,
            CancellationToken cancellationToken)
        {
            var transactionCategoriesAsync = await _dbContext.TransactionCategories.ToListAsync(cancellationToken);
            return transactionCategoriesAsync
                .Select(tc => Mapper.Map<TransactionCategoryDto>(tc))
                .ToList();
        }
    }
}
