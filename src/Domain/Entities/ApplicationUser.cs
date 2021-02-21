using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public List<Account> Accounts { get; set; }
        public bool IsGuest { get; set; }
    }
}
