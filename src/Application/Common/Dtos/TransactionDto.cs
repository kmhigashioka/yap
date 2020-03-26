using System;
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Dtos
{
    public class TransactionDto
    {

        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public TransactionCategoryDto Category { get; set; }
        public float Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
