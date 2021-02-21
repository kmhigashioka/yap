using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
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
                Email = userDto.Email,
                UserName = userDto.UserName,
                IsGuest = userDto.IsGuest
            };
            var result = await _userManager.CreateAsync(user, password);
            return (result.ToApplicationResult(), user.Id);
        }

        public Task<Result> DeleteUserAsync(string userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Result> UpdateUserWithPasswordAsync(string userId, ApplicationUserDto userDto, string password)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            user.UserName = userDto.UserName;
            user.IsGuest = false;
            var result = await _userManager.UpdateAsync(user);
            result = await _userManager.RemovePasswordAsync(user);
            result = await _userManager.AddPasswordAsync(user, password);
            return result.ToApplicationResult();
        }
    }
}
