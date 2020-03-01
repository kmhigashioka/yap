using Application.Common.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
#if DEBUG
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            var identityServerAuthority = configuration.GetValue<string>("IdentityServerAuthority");
#else
            var connectionString = Environment.GetEnvironmentVariable("YAP_CONNECTION_STRING");
            var identityServerAuthority = Environment.GetEnvironmentVariable("YAP_IDENTITY_SERVER_AUTHORITY");
#endif
            services.AddDbContext<ApplicationDbContext>(
                options => options.UseNpgsql(
                    connectionString,
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.Password.RequireLowercase = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredUniqueChars = 0;
                    options.Password.RequiredLength = 1;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddIdentityServer()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryClients(Config.GetClients())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddDeveloperSigningCredential()
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<ProfileService>();
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                })
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = identityServerAuthority;
                    options.RequireHttpsMetadata = false;
                    options.ApiName = "api1";
                });
            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();
            return services;
        }
    }
}
