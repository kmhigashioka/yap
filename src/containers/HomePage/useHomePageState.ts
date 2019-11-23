import React from 'react';
import {
  UseHomePageState,
  Account,
  Transaction,
  TransactionType,
} from './types';

const useHomePageState = (): UseHomePageState => {
  const [accounts, setAccounts] = React.useState<Account[]>([
    {
      id: 1,
      name: 'Bank Developer Option',
      abbreviation: 'BDO',
      balance: 0,
      transactions: [
        {
          amount: 200,
          id: 1,
          category: 'Charges',
          description: '',
          date: new Date('11/2/2019'),
          accountId: 1,
          type: TransactionType.Expense,
        },
        {
          amount: 500,
          id: 2,
          category: 'Withdrawal',
          description: '',
          date: new Date('11/2/2019'),
          accountId: 1,
          type: TransactionType.Expense,
        },
      ],
    },
    {
      id: 2,
      name: 'Bank of the Personal Information',
      abbreviation: 'BPI',
      balance: 0,
      transactions: [
        {
          amount: 1500,
          id: 3,
          category: 'Withdrawal',
          description: '',
          date: new Date('11/2/2019'),
          accountId: 2,
          type: TransactionType.Expense,
        },
      ],
    },
  ]);

  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );

  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
  };

  const getAllTransactions = (): Transaction[] =>
    accounts.reduce(
      (prev: Transaction[], curr) => [...prev, ...curr.transactions],
      [],
    );

  const transactions = activeAccount
    ? activeAccount.transactions
    : getAllTransactions();

  const deleteTransaction = (
    accountId: number,
    transactionId: number,
  ): void => {
    const newAccounts = accounts.map(account => {
      if (accountId === account.id) {
        return {
          ...account,
          transactions: account.transactions.filter(
            transaction => transaction.id !== transactionId,
          ),
        };
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  const editTransaction = (
    accountId: number,
    transactionId: number,
    newTransaction: Transaction,
  ): void => {
    const newAccounts = accounts.map(account => {
      if (accountId === account.id) {
        return {
          ...account,
          transactions: account.transactions.map(transaction => {
            if (transaction.id === transactionId) {
              return {
                ...transaction,
                ...newTransaction,
              };
            }
            return transaction;
          }),
        };
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  const addTransaction = (
    accountId: number,
    newTransaction: Transaction,
  ): void => {
    const newAccounts = accounts.map(account => {
      if (account.id === accountId) {
        return {
          ...account,
          transactions: [...account.transactions, newTransaction],
        };
      }
      return { ...account };
    });
    setAccounts(newAccounts);
  };

  React.useEffect(() => {
    if (activeAccount === null) {
      return;
    }
    const newAccount = accounts.find(
      account => account.id === activeAccount.id,
    );
    if (!newAccount) {
      return;
    }
    setActiveAccount(newAccount);
  }, [accounts, activeAccount]);

  return {
    transactions,
    deleteTransaction,
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    editTransaction,
    addTransaction,
  };
};

export default useHomePageState;
