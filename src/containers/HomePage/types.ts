export type THomePageContext = {
  expenses: Expense[];
  deleteExpense: (accountId: number, expenseId: number) => void;
  addAccount: (account: Account) => void;
  setActiveAccount: (account: Account | null) => void;
  accounts: Account[];
  activeAccount: Account | null;
};

export interface IAppBarProps {}

export interface IFormDialogProps {
  open: boolean;
  onClose: () => void;
  addAccount: (account: Account) => void;
}

export type Account = {
  id: number;
  name: string;
  abbreviation: string;
  balance: number;
  expenses: Expense[];
};

export type Expense = {
  category: string;
  amount: number;
  description: string;
  date: string;
  id: number;
  accountId: number;
};
