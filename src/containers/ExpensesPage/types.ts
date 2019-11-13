export type TExpensesPageContext = {};

export interface IExpensesPageProps {}

export interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}
