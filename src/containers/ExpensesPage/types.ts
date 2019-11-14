import { Expense } from '../HomePage/types';

export type TExpensesPageContext = {};

export interface IExpensesPageProps {
  editExpense: (
    accountId: number,
    expenseId: number,
    newExpense: Expense,
  ) => void;
}
export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}
