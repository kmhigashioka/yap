namespace Domain.Entities
{
    public class TransactionCategory : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Display { get; set; }
    }
}
