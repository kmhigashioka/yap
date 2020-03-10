export type TCategoryPageContext = {};
export interface TitlePageWithSearchProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CategoryListProps {
  categories: Category[];
}

export type Category = {
  id: number;
  name: string;
  display: boolean;
};
