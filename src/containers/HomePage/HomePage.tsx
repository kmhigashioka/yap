import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import ExpensesPage from '../ExpensesPage/Loadable';
import { Account } from './types';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const [accounts, setAccounts] = React.useState<Account[]>([
    { id: 1, name: 'Bank Developer Option', abbreviation: 'BDO', balance: 0 },
    {
      id: 2,
      name: 'Bank of the Personal Information',
      abbreviation: 'BPI',
      balance: 0,
    },
  ]);
  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );
  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
  };
  const classes = useStyle();

  return (
    <HomePageContext.Provider value={{}}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <AppBar
        accounts={accounts}
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
        addAccount={addAccount}
      />
      <div className={classes.contentContainer}>
        <Switch>
          <Route component={ExpensesPage} />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
