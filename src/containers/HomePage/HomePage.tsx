import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage';
import useHomePageState from './useHomePageState';
import CategoryPage from '../CategoryPage';
import { Account } from './types';
import useRequest from '../../utils/useRequest';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const classes = useStyle();
  const {
    addAccount,
    setActiveAccount,
    accounts,
    activeAccount,
    setAccounts,
  } = useHomePageState();

  const { data } = useRequest<Account[]>(
    { url: `${process.env.REACT_APP_API_URL}/api/accounts` },
    [setAccounts],
  );

  React.useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data, setAccounts]);

  return (
    <HomePageContext.Provider
      value={{
        addAccount,
        setActiveAccount,
        accounts,
        activeAccount,
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
