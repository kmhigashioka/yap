import { DialogProps } from '@material-ui/core/Dialog';
import { Transaction } from '../HomePage/types';

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
  setSelectedTransaction: (transaction: Transaction | null) => void;
  selectedTransaction: Transaction | null;
  setSnackbarMessage: (message: string) => void;
}

export interface AddTransactionDialogProps extends DialogProps {
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
}