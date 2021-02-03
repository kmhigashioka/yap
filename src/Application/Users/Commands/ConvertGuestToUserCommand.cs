using Application.Common.Dtos;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Omu.ValueInjecter;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public class ConvertGuestToUserCommand : IRequest, IUserRegistrationForm
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class ConvertGuestToUserCommandHandler : IRequestHandler<ConvertGuestToUserCommand>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;

        public ConvertGuestToUserCommandHandler(ICurrentUserService currentUserService, IIdentityService identityService)
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(ConvertGuestToUserCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            var userDto = Mapper.Map<ApplicationUserDto>(request);
            var result = await _identityService.UpdateUserWithPasswordAsync(userId, userDto, request.Password);
            if (result.Errors.Any())
            {
                var errorMessage = string.Join(",", result.Errors.Select(e => e));
                throw new BadRequestException(errorMessage);
            }
            return new Unit();
        }
    }
}
