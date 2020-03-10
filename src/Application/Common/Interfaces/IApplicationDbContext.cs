using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Account> Accounts { get; set; }
        DbSet<TransactionCategory> TransactionCategories { get; set; }
        DbSet<ApplicationUser> Users { get; set; }
        DbSet<Todo> Todos { get; set; }
        int SaveChanges();
        DatabaseFacade Database { get; }
    }
}
