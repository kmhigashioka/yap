import React from 'react';
import { UseHomePageState, Account, Transaction } from './types';

const useHomePageState = (): UseHomePageState => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );

  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
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
    editTransaction,
    setAccounts,
  };
};

export default useHomePageState;
