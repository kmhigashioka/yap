export type THomePageContext = {
  addAccount: (account: Account) => void;
  setActiveAccount: (account: Account | null) => void;
  accounts: Account[];
  activeAccount: Account | null;
};

export interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  addAccount: (account: Account) => void;
}

export type Account = {
  id: number;
  name: string;
  abbreviation: string;
  balance: number;
  transactions: Transaction[];
};

export enum TransactionType {
  Expense,
  Income,
}

export type Transaction = {
  category: string;
  amount: number;
  description: string;
  date: Date;
  id: number;
  accountId: number;
  type: TransactionType;
};

export type UseHomePageState = {
  setAccounts: (accounts: Account[]) => void;
} & THomePageContext;

export interface User {
  id: string;
  fullName: string;
  email: string;
}
