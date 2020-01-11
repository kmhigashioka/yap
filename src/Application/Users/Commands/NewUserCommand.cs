using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Users.Commands
{
    public class NewUserCommand: IRequest<ApplicationUserDto>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class NewUserCommandHandler: IRequestHandler<NewUserCommand, ApplicationUserDto>
    {
        private readonly IIdentityService _identityService;

        public NewUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<ApplicationUserDto> Handle(NewUserCommand request, CancellationToken cancellationToken)
        {
            var (result, userId) = await _identityService.CreateUserAsync(request.UserName, request.Password);
            if (result.Errors.Any())
            {
                var errorMessage = string.Join(",", result.Errors.Select(e => e));
                throw new BadRequestException(errorMessage);
            }
            var user = await _identityService.GetUserAsync(userId);
            return user;
        }
    }
}
