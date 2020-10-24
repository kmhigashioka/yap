import React from 'react';
import { Helmet } from 'react-helmet-async';
import CategoryPageContext from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';
import CategoryList from './CategoryList';
import { TransactionCategory } from './types';
import useFetch from '../../utils/useFetch';

const CategoryPage = (): React.ReactElement => {
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [queriedCategories, setQueriedCategories] = React.useState(categories);
  const { requestWithToken } = useFetch();

  const fetchCategories = React.useCallback(async (): Promise<void> => {
    const data = await requestWithToken<TransactionCategory[]>(
      `/api/TransactionCategories`,
    );
    setCategories(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  React.useEffect(() => {
    const newQueriedCategories = categories.filter(
      (category) => category.name.toLowerCase().indexOf(searchQuery) > -1,
    );
    setQueriedCategories(newQueriedCategories);
  }, [searchQuery, categories]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return (
    <CategoryPageContext.Provider value={{}}>
      <Helmet>
        <title>CategoryPage</title>
        <meta name="description" content="Description of CategoryPage" />
      </Helmet>
      <TitlePageWithSearch onSearch={handleSearch} />
      <CategoryList categories={queriedCategories} />
    </CategoryPageContext.Provider>
  );
};

export default CategoryPage;
