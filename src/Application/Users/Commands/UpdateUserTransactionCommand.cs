﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;

namespace Application.Users.Commands
{
    public class UpdateUserTransactionCommand : IRequest<List<TransactionDto>>
    {
        public List<TransactionDto> Transactions { get; set; }
        public string UserId { get; set; }
    }

    public class UpdateUserTransactionCommandHandler : IRequestHandler<UpdateUserTransactionCommand, List<TransactionDto>>
    {
        private readonly IApplicationDbContext _dbContext;

        public UpdateUserTransactionCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<TransactionDto>> Handle(UpdateUserTransactionCommand request, CancellationToken cancellationToken)
        {
            var transactionIds = request.Transactions.Select(t => t.Id).ToList();
            var transactions = _dbContext.Transactions
                .Include(t => t.Account)
                .Include(t => t.Category)
                .Where(t => transactionIds.Contains(t.Id) && t.Account.User.Id == request.UserId)
                .ToList();

            request.Transactions.ForEach(rt =>
            {
                var transaction = transactions.FirstOrDefault(t => t.Id == rt.Id);
                if (transaction == null)
                {
                    return;
                }
                ComputeNewBalance(transaction, rt);
                transaction.InjectFrom(rt);
            });

            _dbContext.SaveChanges();

            return transactions
                .Select(t =>
                {
                    var dto = Mapper.Map<TransactionDto>(t);
                    dto.Category = Mapper.Map<TransactionCategoryDto>(t.Category);
                    dto.Account = AccountDto.From(t.Account);
                    return dto;
                })
                .ToList();
        }

        private void ComputeNewBalance(Transaction transaction, TransactionDto rt)
        {
            switch (transaction.Type)
            {
                case TransactionType.Expense:
                    transaction.Account.Balance += transaction.Amount;
                    break;
                case TransactionType.Income:
                    transaction.Account.Balance -= transaction.Amount;
                    break;
            }

            switch (rt.Type)
            {
                case TransactionType.Expense:
                    transaction.Account.Balance -= rt.Amount;
                    break;
                case TransactionType.Income:
                    transaction.Account.Balance += rt.Amount;
                    break;
            }
        }
    }
}
