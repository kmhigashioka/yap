import { Account } from '../HomePage/types';

export type TDashboardPageContext = {};

export interface DashboardAccountItemProps {
  account: Account;
  setSnackbarMessage: (message: string) => void;
}

export interface DashboardAccountListProps {
  setSnackbarMessage: (message: string) => void;
}
