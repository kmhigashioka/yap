export type THomePageContext = {};
export interface IAppBarProps {
  accounts: Account[];
  activeAccount: Account | null;
  setActiveAccount: (account: Account | null) => void;
}
export type Account = {
  id: number;
  name: string;
  abbreviation: string;
};
