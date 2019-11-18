export type THomePageContext = {} & UseHomePageState;

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
  transactions: Transaction[];
  deleteTransaction: (accountId: number, transactionId: number) => void;
  addAccount: (account: Account) => void;
  setActiveAccount: (account: Account | null) => void;
  accounts: Account[];
  activeAccount: Account | null;
  editTransaction: (
    accountId: number,
    transactionId: number,
    newTransaction: Transaction,
  ) => void;
  addTransaction: (accountId: number, newTransaction: Transaction) => void;
};
