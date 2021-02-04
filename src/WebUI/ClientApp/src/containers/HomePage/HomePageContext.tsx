import React from 'react';
import { THomePageContext, Account, User } from './types';

export const HomePageContext = React.createContext<
  THomePageContext | undefined
>(undefined);

HomePageContext.displayName = 'HomePageContext';

export function useHomePageContext(): THomePageContext {
  const context = React.useContext(HomePageContext);
  if (context === undefined) {
    throw new Error(
      'useHomePageContext must be used within a HomePageContextProvider.',
    );
  }
  return context;
}

export function HomePageProvider({
  accounts,
  children,
  currentUser,
  setAccounts,
  setCurrentUser,
}: {
  accounts: Account[];
  children: React.ReactNode;
  currentUser: User | null;
  setAccounts: (accounts: Account[]) => void;
  setCurrentUser: (user: User | null) => void;
}): React.ReactElement {
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

  const value = {
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    updateAccountBalance,
    deleteAccount,
    editAccount,
    currentUser,
    setCurrentUser,
  };

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
}
