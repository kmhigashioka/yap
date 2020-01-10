using System;

namespace Application.Common.Dtos
{
    public class TodoDto
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool Done { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}
