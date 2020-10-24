import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage';
import useHomePageState from './useHomePageState';
import CategoryPage from '../CategoryPage';
import { Account, User } from './types';
import DashboardPage from '../DashboardPage';
import useFetch from '../../utils/useFetch';

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
    setCurrentUser,
    updateAccountBalance,
  } = useHomePageState();
  const [fetchingUser, setFetchingUser] = React.useState(false);
  const [, setError] = React.useState();
  const { requestWithToken } = useFetch();

  const fetchAccounts = React.useCallback(async (): Promise<void> => {
    try {
      setAccounts(await requestWithToken<Account[]>('/api/users/accounts'));
    } catch (err) {
      setError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const fetchCurrentUser = React.useCallback(async (): Promise<void> => {
    setFetchingUser(true);
    try {
      setCurrentUser(await requestWithToken<User>('/api/users/me'));
    } catch (err) {
      setError(err);
    }
    setFetchingUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (fetchingUser) {
    return <div>Fetching user...</div>;
  }

  return (
    <HomePageContext.Provider
      value={{
        addAccount,
        setActiveAccount,
        accounts,
        activeAccount,
        updateAccountBalance,
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
          <Route path="/transactions" component={TransactionsPage} />
          <Route component={DashboardPage} />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
