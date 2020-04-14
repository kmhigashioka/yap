using System;
using Application.Common.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("APPLICATION_CONNECTION_STRING");
            var identityServerApiName = Environment.GetEnvironmentVariable("APPLICATION_IDENTITY_SERVER_API_NAME");
            var identityServerAuthority = Environment.GetEnvironmentVariable("APPLICATION_IDENTITY_SERVER_AUTHORITY");

            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration.GetConnectionString("DefaultConnection");
            }

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
            services.AddIdentityServer(x => x.IssuerUri = identityServerAuthority)
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
                    options.ApiName = identityServerApiName;
                });
            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();
            return services;
        }
    }
}
