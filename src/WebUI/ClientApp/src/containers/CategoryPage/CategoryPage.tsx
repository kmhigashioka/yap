import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CategoryPageContext from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';
import CategoryList from './CategoryList';
import { TransactionCategory } from './types';
import useFetch from '../../utils/useFetch';

const useStyles = makeStyles(() => ({
  fabContainer: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
  },
}));

const CategoryPage = (): React.ReactElement => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<TransactionCategory[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [queriedCategories, setQueriedCategories] = React.useState(categories);
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const data = await requestWithToken<TransactionCategory[]>(
        `/api/TransactionCategories`,
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    const newQueriedCategories = categories.filter(
      category => category.name.toLowerCase().indexOf(searchQuery) > -1,
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
      <Fab
        color="primary"
        classes={{ root: classes.fabContainer }}
        data-testid="add-transaction"
      >
        <AddIcon />
      </Fab>
    </CategoryPageContext.Provider>
  );
};

export default CategoryPage;
