using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.Accounts.Commands
{
    public class NewAccountCommand: IRequest<AccountDto>
    {
        public AccountDto Account { get; set; }
        public string UserId { get; set; }
    }

    public class NewAccountCommandHandler: IRequestHandler<NewAccountCommand, AccountDto>
    {
        private readonly IApplicationDbContext _dbContext;

        public NewAccountCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AccountDto> Handle(NewAccountCommand request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);
            var account = Mapper.Map<Account>(request.Account);
            account.User = user;
            _dbContext.Accounts.Add(account);
            _dbContext.SaveChanges();
            return Mapper.Map<AccountDto>(account);
        }
    }
}
