using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.Users.Queries
{
    public class GetMeQuery: IRequest<ApplicationUserDto>
    {
        public string CurrentUserId { get; set; }
    }

    public class GetMeQueryHandler: IRequestHandler<GetMeQuery, ApplicationUserDto>
    {
        private readonly IApplicationDbContext _dbContext;

        public GetMeQueryHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ApplicationUserDto> Handle(GetMeQuery request, CancellationToken cancellationToken)
        {
            var appuser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == request.CurrentUserId, cancellationToken);
            return Mapper.Map<ApplicationUserDto>(appuser);
        }
    }
}
