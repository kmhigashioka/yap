export type TCategoryPageContext = {};
export interface TitlePageWithSearchProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CategoryListProps {
  categories: Category[];
  onToggleDisplay: (category: Category, value: boolean) => void;
}

export type Category = {
  name: string;
  display: boolean;
};
