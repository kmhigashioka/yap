using System.Threading.Tasks;
using Application.Common.Dtos;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<ApplicationUserDto> GetUserAsync(string userId);
        Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUserDto user, string password);

        Task<Result> DeleteUserAsync(string userId);
        Task<Result> UpdateUserWithPasswordAsync(string userId, ApplicationUserDto userDto, string password);
    }
}
