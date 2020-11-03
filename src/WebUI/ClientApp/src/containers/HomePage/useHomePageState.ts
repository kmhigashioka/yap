import React from 'react';
import { UseHomePageState, Account, User } from './types';

const useHomePageState = (): UseHomePageState => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );

  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
  };

  const updateAccountBalance = (id: number, balance: number): void => {
    const newAccounts = accounts.map((a) => {
      const newAccount = { ...a };
      if (newAccount.id === id) {
        newAccount.balance = balance;
      }
      return newAccount;
    });

    setAccounts(newAccounts);
  };

  const deleteAccount = (id: number): void => {
    const newAccounts = accounts.filter((a) => a.id !== id);
    setAccounts(newAccounts);
  };

  const editAccount = (id: number, account: Account): void => {
    const newAccounts = accounts.map((a) => {
      let newAccount = { ...a };

      if (id === a.id) {
        newAccount = {
          ...newAccount,
          balance: account.balance,
          abbreviation: account.abbreviation,
          name: account.name,
        };
      }

      return newAccount;
    });

    setAccounts(newAccounts);
  };

  React.useEffect(() => {
    if (activeAccount === null) {
      return;
    }
    const newAccount = accounts.find(
      (account) => account.id === activeAccount.id,
    );
    if (!newAccount) {
      setActiveAccount(null);
      return;
    }
    setActiveAccount(newAccount);
  }, [accounts, activeAccount]);

  return {
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    setAccounts,
    currentUser,
    setCurrentUser,
    updateAccountBalance,
    deleteAccount,
    editAccount,
  };
};

export default useHomePageState;
