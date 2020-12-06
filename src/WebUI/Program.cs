using System;
using Application.Common.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Infrastructure.Persistence;
using IdentityServer4.EntityFramework.DbContexts;

namespace WebUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<IApplicationDbContext>();
                    DbInitializer.Initialize(context);

                    var context2 = services.GetRequiredService<PersistedGrantDbContext>();
                    DbInitializer.Initialize(context2);

                    var context3 = services.GetRequiredService<ConfigurationDbContext>();
                    DbInitializer.Initialize(context3);

                    var dbContext = services.GetRequiredService<IApplicationDbContext>();
                    var dateTimeService = services.GetRequiredService<IDateTime>();
                    ApplicationDbContextSeed.SeedAsync(dbContext, dateTimeService);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureKestrel((context, options) =>
                {

                });
    }
}
