import { Expense } from '../HomePage/types';

export type TExpensesPageContext = {};

export interface IExpensesPageProps {}

export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export interface ExpenseFormProps extends ExpensesPageState {
  setSnackbarMessage: (message: string) => void;
}

export interface ExpenseListProps extends ExpensesPageState {}

interface ExpensesPageState {
  setSelectedExpense: (expense: Expense | null) => void;
  selectedExpense: Expense | null;
}
