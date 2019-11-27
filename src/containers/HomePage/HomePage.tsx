import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage';
import useHomePageState from './useHomePageState';
import CategoryPage from '../CategoryPage';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const classes = useStyle();
  const {
    transactions,
    deleteTransaction,
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    editTransaction,
    addTransaction,
  } = useHomePageState();

  return (
    <HomePageContext.Provider
      value={{
        transactions,
        deleteTransaction,
        addAccount,
        setActiveAccount,
        accounts,
        activeAccount,
        editTransaction,
        addTransaction,
      }}
    >
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <AppBar />
      <div className={classes.contentContainer}>
        <Switch>
          <Route path="/category" component={CategoryPage} />
          <Route component={TransactionsPage} />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
