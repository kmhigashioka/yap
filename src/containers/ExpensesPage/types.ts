import { Expense } from '../HomePage/types';

export type TExpensesPageContext = {};

export interface IExpensesPageProps {}

export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export interface ExpenseFormProps {
  selectedExpense: Expense | null;
  setSelectedExpense: (expense: Expense | null) => void;
  setSnackbarMessage: (message: string) => void;
}

export interface ExpenseListProps {
  setSelectedExpense: (expense: Expense | null) => void;
  selectedExpense: Expense | null;
}
