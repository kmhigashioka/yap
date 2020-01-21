import React from 'react';
import { UseHomePageState, Account } from './types';

const useHomePageState = (): UseHomePageState => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );

  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
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
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    setAccounts,
  };
};

export default useHomePageState;