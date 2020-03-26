using System.Collections.Generic;

namespace Domain.Entities
{
    public class Account : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public float Balance { get; set; }
        public ApplicationUser User { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}
