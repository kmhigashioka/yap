import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { HomePageProvider } from './HomePageContext';
import AppBar from './AppBar';
import TransactionsPage from '../TransactionsPage/Loadable';
import CategoryPage from '../CategoryPage/Loadable';
import { Account, User } from './types';
import DashboardPage from '../DashboardPage/Loadable';
import useFetch from '../../utils/useFetch';
import Loading from '../../components/Loading';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const classes = useStyle();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [fetchingUser, setFetchingUser] = React.useState(false);
  const [, setError] = React.useState();
  const { requestWithToken } = useFetch();

  React.useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      try {
        setAccounts(await requestWithToken<Account[]>('/api/users/accounts'));
      } catch (err) {
        setError(err);
      }
    };
    fetchAccounts();
  }, [requestWithToken, setAccounts]);

  React.useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      setFetchingUser(true);
      try {
        setCurrentUser(await requestWithToken<User>('/api/users/me'));
      } catch (err) {
        setError(err);
      }
      setFetchingUser(false);
    };
    fetchCurrentUser();
  }, [requestWithToken, setCurrentUser]);

  if (fetchingUser) {
    return <Loading />;
  }

  return (
    <HomePageProvider
      accounts={accounts}
      currentUser={currentUser}
      setAccounts={setAccounts}
      setCurrentUser={setCurrentUser}
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
    </HomePageProvider>
  );
};

export default HomePage;
