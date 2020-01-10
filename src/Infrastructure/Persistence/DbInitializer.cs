using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public static class DbInitializer
    {
        public static void Initialize(IApplicationDbContext context)
        {
            context.Database.Migrate();
        }
    }
}
