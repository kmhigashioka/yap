using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Entities;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = _userManager.GetUserAsync(context.Subject).Result;

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            context.IssuedClaims.AddRange(claims);
            
            return Task.FromResult(0);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var user = _userManager.GetUserAsync(context.Subject).Result;

            context.IsActive = user != null;
            
            return Task.FromResult(0);
        }
    }
}
