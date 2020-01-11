using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Infrastructure.Services
{
    public class IdentityService: IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ApplicationUserDto> GetUserAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
            return Mapper.Map<ApplicationUserDto>(user);
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(ApplicationUserDto userDto, string password)
        {
            var user = new ApplicationUser
            {
                FullName = userDto.FullName,
                Email = userDto.UserName,
                UserName = userDto.UserName
            };
            var result = await _userManager.CreateAsync(user, password);
            return (result.ToApplicationResult(), user.Id);
        }

        public Task<Result> DeleteUserAsync(string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}
