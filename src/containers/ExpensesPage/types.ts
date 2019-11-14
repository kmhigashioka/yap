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
  deleteExpense: (accountId: number, expenseId: number) => void;
  editExpense: (
    accountId: number,
    expenseId: number,
    newExpense: Expense,
  ) => void;
  setSelectedExpense: (expense: Expense | null) => void;
  setSnackbarMessage: (message: string) => void;
}
