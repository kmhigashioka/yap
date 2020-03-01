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
import useRequest from '../../utils/useRequest';
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
  } = useHomePageState();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [fetchingUser, setFetchingUser] = React.useState(false);
  const [, setError] = React.useState();
  const { requestWithToken } = useFetch();

  const { data } = useRequest<Account[]>(
    { url: `${process.env.REACT_APP_API_URL}/api/accounts` },
    [setAccounts],
  );

  React.useEffect(() => {
    if (data) {
      setAccounts(data);
    }
  }, [data, setAccounts]);

  React.useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      setFetchingUser(true);
      try {
        const data = await requestWithToken<User>('/api/users/me');
        setCurrentUser(data);
      } catch (err) {
        setError(err);
      }
      setFetchingUser(false);
    };
    fetchCurrentUser();
  }, []);

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
