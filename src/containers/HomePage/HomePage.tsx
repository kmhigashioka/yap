import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage';
import useHomePageState from './useHomePageState';
import request from '../../utils/request';
import { Account } from './types';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const classes = useStyle();
  const {
    deleteTransaction,
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    editTransaction,
    addTransaction,
    setAccounts,
  } = useHomePageState();

  React.useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const data = await request<Account[]>(
        `${process.env.REACT_APP_API_URL}/api/accounts`,
      );
      setAccounts(data);
    };
    fetchAccounts();
  }, [setAccounts]);

  return (
    <HomePageContext.Provider
      value={{
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
          <Route component={TransactionsPage} />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
