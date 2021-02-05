import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CategoryPageProvider } from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';
import CategoryList from './CategoryList';
import { TransactionCategory } from './types';
import useFetch from '../../utils/useFetch';
import { useNotificationContext } from '../Notification/NotificationContext';

const CategoryPage = (): React.ReactElement => {
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [queriedCategories, setQueriedCategories] = React.useState(categories);
  const { setSnackbarMessage } = useNotificationContext();
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const data = await requestWithToken<TransactionCategory[]>(
          `/api/TransactionCategories`,
        );
        setCategories(data);
      } catch (error) {
        setSnackbarMessage(error.message);
      }
    };
    fetchCategories();
  }, [requestWithToken, setSnackbarMessage]);

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
    <CategoryPageProvider>
      <Helmet>
        <title>CategoryPage</title>
        <meta name="description" content="Description of CategoryPage" />
      </Helmet>
      <TitlePageWithSearch onSearch={handleSearch} />
      <CategoryList categories={queriedCategories} />
    </CategoryPageProvider>
  );
};

export default CategoryPage;
