import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage';
import useHomePageState from './useHomePageState';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const classes = useStyle();
  const {
    expenses,
    deleteExpense,
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    editExpense,
    addExpense,
  } = useHomePageState();

  return (
    <HomePageContext.Provider
      value={{
        expenses,
        deleteExpense,
        addAccount,
        setActiveAccount,
        accounts,
        activeAccount,
        editExpense,
        addExpense,
      }}
    >
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <AppBar />
      <div className={classes.contentContainer}>
        <Switch>
          <Route component={TransactionsPage} />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
