using System;
using Domain.Enums;

namespace Domain.Entities
{
    public class Transaction : AuditableEntity
    {
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public TransactionCategory Category { get; set; }
        public float Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public Account Account { get; set; }
    }
}
