import React from 'react';
import { UseHomePageState, Account, Expense } from './types';

const useHomePageState = (): UseHomePageState => {
  const [accounts, setAccounts] = React.useState<Account[]>([
    {
      id: 1,
      name: 'Bank Developer Option',
      abbreviation: 'BDO',
      balance: 0,
      expenses: [
        {
          amount: 200,
          id: 1,
          category: 'Charges',
          description: '',
          date: '11/2/2019',
          accountId: 1,
        },
        {
          amount: 500,
          id: 2,
          category: 'Withdrawal',
          description: '',
          date: '11/2/2019',
          accountId: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Bank of the Personal Information',
      abbreviation: 'BPI',
      balance: 0,
      expenses: [
        {
          amount: 1500,
          id: 3,
          category: 'Withdrawal',
          description: '',
          date: '11/2/2019',
          accountId: 2,
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

  const getAllExpenses = (): Expense[] =>
    accounts.reduce((prev: Expense[], curr) => [...prev, ...curr.expenses], []);

  const expenses = activeAccount ? activeAccount.expenses : getAllExpenses();

  const deleteExpense = (accountId: number, expenseId: number): void => {
    const newAccounts = accounts.map(account => {
      if (accountId === account.id) {
        return {
          ...account,
          expenses: account.expenses.filter(
            expense => expense.id !== expenseId,
          ),
        };
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  const editExpense = (
    accountId: number,
    expenseId: number,
    newExpense: Expense,
  ): void => {
    const newAccounts = accounts.map(account => {
      if (accountId === account.id) {
        return {
          ...account,
          expenses: account.expenses.map(expense => {
            if (expense.id === expenseId) {
              return {
                ...expense,
                ...newExpense,
              };
            }
            return expense;
          }),
        };
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  return {
    expenses,
    deleteExpense,
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    editExpense,
  };
};

export default useHomePageState;
