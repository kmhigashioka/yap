using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.Users.Queries
{
    public class GetUserAccountsQuery: IRequest<List<AccountDto>>
    {
        public string UserId { get; set; }
    }

    public class GetUserAccountsQueryHandler: IRequestHandler<GetUserAccountsQuery, List<AccountDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetUserAccountsQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<AccountDto>> Handle(GetUserAccountsQuery request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.Include(u => u.Accounts)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);
            return user.Accounts.Select(a => Mapper.Map<AccountDto>(a)).ToList();
        }
    }
}
