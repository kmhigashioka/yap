import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CategoryPageContext from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';
import CategoryList from './CategoryList';
import { Category } from './types';
import useFetch from '../../utils/useFetch';
import request from '../../utils/request';

const useStyles = makeStyles(() => ({
  fabContainer: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
  },
}));

const CategoryPage = (): React.ReactElement => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [queriedCategories, setQueriedCategories] = React.useState(categories);
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const data = await requestWithToken<Category[]>(
        `/api/TransactionCategories`,
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    const newQueriedCategories = categories.filter(
      (category: { [key: string]: {} }) =>
        Object.keys(category).some(key => {
          if (typeof category[key] === 'string') {
            const categoryValue = (category[key] as string).toLowerCase();
            const isMatched = categoryValue.indexOf(searchQuery) > -1;
            return isMatched;
          }
          return false;
        }),
    );
    setQueriedCategories(newQueriedCategories);
  }, [searchQuery, categories]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleToggleDisplay = (category: Category, value: boolean): void => {
    setCategories(
      categories.map(mapCategory => {
        if (mapCategory.name === category.name) {
          return {
            ...mapCategory,
            display: value,
          };
        }
        return mapCategory;
      }),
    );
    const updateDisplay = async (): Promise<void> => {
      const body = {
        display: value,
      };
      await request(
        `${process.env.REACT_APP_API_URL}/api/usercategories/${category.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
    };
    updateDisplay();
  };

  return (
    <CategoryPageContext.Provider value={{}}>
      <Helmet>
        <title>CategoryPage</title>
        <meta name="description" content="Description of CategoryPage" />
      </Helmet>
      <TitlePageWithSearch onSearch={handleSearch} />
      <CategoryList
        categories={queriedCategories}
        onToggleDisplay={handleToggleDisplay}
      />
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
