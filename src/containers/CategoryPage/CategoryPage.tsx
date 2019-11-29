import React from 'react';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CategoryPageContext from './CategoryPageContext';
import TitlePageWithSearch from './TitlePageWithSearch';

const useStyles = makeStyles(() => ({
  fabContainer: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
  },
}));

const CategoryPage = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <CategoryPageContext.Provider value={{}}>
      <Helmet>
        <title>CategoryPage</title>
        <meta name="description" content="Description of CategoryPage" />
      </Helmet>
      <TitlePageWithSearch onSearch={(): void => {}} />
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
