import { DialogProps } from '@material-ui/core/Dialog';
import { Expense } from '../HomePage/types';

export type TExpensesPageContext = {};

export interface IExpensesPageProps {}

export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export interface ExpenseFormProps extends ExpensesPageState {}

export interface ExpenseListProps extends ExpensesPageState {}

interface ExpensesPageState {
  setSelectedExpense: (expense: Expense | null) => void;
  selectedExpense: Expense | null;
  setSnackbarMessage: (message: string) => void;
}

export interface AddExpenseDialogProps extends DialogProps {
  onClose: () => void;
  setSnackbarMessage: (message: string) => void;
}
