namespace Application.Common.Dtos
{
    public class AccountDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public float Balance { get; set; }
        public ApplicationUserDto User { get; set; }
    }
}
