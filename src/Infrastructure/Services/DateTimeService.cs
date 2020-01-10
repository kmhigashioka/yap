using System;
using Application.Common.Interfaces;

namespace Infrastructure.Services
{
    public class DateTimeService: IDateTime
    {
        public DateTime UtcNow()
        {
            return DateTime.UtcNow;
        }
    }
}
