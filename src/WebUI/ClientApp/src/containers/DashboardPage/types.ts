import { Account } from '../HomePage/types';

export type TDashboardPageContext = {};

export interface DashboardAccountItemProps {
  account: Account;
  setSnackbarMessage: (message: string) => void;
}

export interface DashboardAccountListProps {
  setSnackbarMessage: (message: string) => void;
}

export interface EditAccountDialogProps {
  open: boolean;
  onClose: () => void;
  account: Account;
  editAccount: (id: number, account: Account) => void;
  setSnackbarMessage: (message: string) => void;
}
