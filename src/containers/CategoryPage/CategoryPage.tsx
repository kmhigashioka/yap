import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CategoryPageContext from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';
import CategoryList from './CategoryList';
import supportedCategories from './supportedCategory';
import { Category } from './types';

const useStyles = makeStyles(() => ({
  fabContainer: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
  },
}));

const CategoryPage = (): React.ReactElement => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState(supportedCategories);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [queriedCategories, setQueriedCategories] = React.useState(categories);

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
