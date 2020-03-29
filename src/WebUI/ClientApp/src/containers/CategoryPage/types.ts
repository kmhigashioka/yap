export type TCategoryPageContext = {};
export interface TitlePageWithSearchProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CategoryListProps {
  categories: TransactionCategory[];
}

export interface TransactionCategory {
  id: number;
  name: string;
  display: boolean;
}
