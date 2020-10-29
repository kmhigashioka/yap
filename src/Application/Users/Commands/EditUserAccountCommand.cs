using Application.Common.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public class EditUserAccountCommand : IRequest<AccountDto>
    {
        public AccountDto Account { get; set; }
    }

    public class EditUserAccountCommandHandler : IRequestHandler<EditUserAccountCommand, AccountDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public EditUserAccountCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public Task<AccountDto> Handle(EditUserAccountCommand request, CancellationToken cancellationToken)
        {
            var account = _context.Accounts
                .Include(a => a.User)
                .FirstOrDefault(a => a.User.Id == _currentUserService.UserId && a.Id == request.Account.Id);

            if (account == null)
            {
                throw new NotFoundException("The account does not exist.");
            }

            account.Name = request.Account.Name;
            account.Abbreviation = request.Account.Abbreviation;
            account.Balance = request.Account.Balance;

            _context.SaveChanges();

            return Task.FromResult(AccountDto.From(account));
        }
    }
}
