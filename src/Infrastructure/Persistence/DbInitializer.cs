using Application.Common.Interfaces;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Persistence
{
    public static class DbInitializer
    {
        public static void Initialize(IApplicationDbContext context)
        {
            context.Database.Migrate();
        }

        public static void Initialize(PersistedGrantDbContext context)
        {
            context.Database.Migrate();
        }

        public static void Initialize(ConfigurationDbContext context)
        {
            context.Database.Migrate();

            if (!context.Clients.Any())
            {
                foreach (var client in Config.GetClients())
                {
                    context.Clients.Add(client.ToEntity());
                }
                context.SaveChanges();
            }

            if (!context.IdentityResources.Any())
            {
                foreach (var resource in Config.GetIdentityResources())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }

            if (!context.ApiResources.Any())
            {
                foreach (var resource in Config.GetApiResources())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
        }
    }
}
