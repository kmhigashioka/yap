using System.Collections.Generic;
using System.Linq;
using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContextSeed
    {
        public static void SeedAsync(IApplicationDbContext dbContext, IDateTime dateTimeService)
        {
            var defaultTransactionCategories = new List<TransactionCategory>
            {
                new TransactionCategory
                {
                    Created = dateTimeService.UtcNow(),
                    Name = "Charges",
                    Display = true
                },
                new TransactionCategory
                {
                    Created = dateTimeService.UtcNow(),
                    Name = "Insurance",
                    Display = true
                },
                new TransactionCategory
                {
                    Created = dateTimeService.UtcNow(),
                    Name = "Investment",
                    Display = true
                },
                new TransactionCategory
                {
                    Created = dateTimeService.UtcNow(),
                    Name = "Wage",
                    Display = true
                },
                new TransactionCategory
                {
                    Created = dateTimeService.UtcNow(),
                    Name = "Withdraw",
                    Display = true
                }
            };
            var defaultTransactionCategoryNames = defaultTransactionCategories.Select(tc => tc.Name).ToList();
            var existingTransactionCategories = dbContext.TransactionCategories.Where(tc => defaultTransactionCategoryNames.Contains(tc.Name));
            var shouldSave = false;
            defaultTransactionCategories.ForEach(d =>
            {
                if (existingTransactionCategories.Any(e => e.Name == d.Name))
                {
                    return;
                }

                dbContext.TransactionCategories.Add(d);
                shouldSave = true;
            });
            if (shouldSave)
            {
                dbContext.SaveChanges();
            }
        }
    }
}
