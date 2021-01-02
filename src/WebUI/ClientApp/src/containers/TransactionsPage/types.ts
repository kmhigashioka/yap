import * as React from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { TransactionCategory } from '../CategoryPage/types';
import { Account, Transaction, TransactionType } from '../HomePage/types';

export type TTransactionPageContext = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (newTransaction: Transaction) => void;
  deleteTransaction: (transactionId: number) => void;
  editTransaction: (transactionId: number, newTransaction: Transaction) => void;
};

export interface DeleteTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export interface TransactionsPageState {
  selectedTransaction: Transaction | null;
  setSnackbarMessage: (message: string) => void;
  onItemClick: (transaction: Transaction | null) => void;
}

export interface AddTransactionDialogProps extends DialogProps {
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
  categories: TransactionCategory[];
}

export interface UpdateUserTransactionCommandVm {
  category: TransactionCategory;
  amount: number;
  description: string;
  date: Date;
  id: number;
  account: Account;
  type: TransactionType;
}

export interface TransactionFormProps {
  setSelectedTransaction: (transaction: Transaction | null) => void;
  selectedTransaction: Transaction | null;
  setSnackbarMessage: (message: string) => void;
  open: boolean;
  onClose: () => void;
}
