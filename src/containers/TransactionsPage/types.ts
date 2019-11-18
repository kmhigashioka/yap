import { DialogProps } from '@material-ui/core/Dialog';
import { Transaction } from '../HomePage/types';

export type TTransactionPageContext = {};

export interface ITransactionPageProps {}

export interface DeleteTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export interface TransactionFormProps extends TransactionsPageState {}

export interface TransactionListProps extends TransactionsPageState {}

interface TransactionsPageState {
  setSelectedTransaction: (transaction: Transaction | null) => void;
  selectedTransaction: Transaction | null;
  setSnackbarMessage: (message: string) => void;
}

export interface AddTransactionDialogProps extends DialogProps {
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
}
