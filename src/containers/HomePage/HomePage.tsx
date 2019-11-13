import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import ExpensesPage from '../ExpensesPage';
import { Account, Expense } from './types';

const useStyle = makeStyles({
  contentContainer: {
    minHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
  },
});

const HomePage = (): React.ReactElement => {
  const [accounts, setAccounts] = React.useState<Account[]>([
    {
      id: 1,
      name: 'Bank Developer Option',
      abbreviation: 'BDO',
      balance: 0,
      expenses: [
        {
          amount: 200,
          id: 1,
          category: 'Charges',
          description: '',
          date: '11/2/2019',
          accountId: 1,
        },
        {
          amount: 500,
          id: 2,
          category: 'Withdrawal',
          description: '',
          date: '11/2/2019',
          accountId: 1,
        },
      ],
    },
    {
      id: 2,
      name: 'Bank of the Personal Information',
      abbreviation: 'BPI',
      balance: 0,
      expenses: [
        {
          amount: 1500,
          id: 3,
          category: 'Withdrawal',
          description: '',
          date: '11/2/2019',
          accountId: 2,
        },
      ],
    },
  ]);
  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );
  const addAccount = (account: Account): void => {
    setAccounts([...accounts, account]);
  };
  const classes = useStyle();
  const getAllExpenses = (): Expense[] =>
    accounts.reduce((prev: Expense[], curr) => [...prev, ...curr.expenses], []);
  const expenses = activeAccount ? activeAccount.expenses : getAllExpenses();
  const deleteExpense = (accountId: number, expenseId: number): void => {
    const newAccounts = accounts.map(account => {
      if (accountId === account.id) {
        return {
          ...account,
          expenses: account.expenses.filter(
            expense => expense.id !== expenseId,
          ),
        };
      }
      return account;
    });
    setAccounts(newAccounts);
  };

  return (
    <HomePageContext.Provider
      value={{
        expenses,
        deleteExpense,
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
          <Route
            render={(props): React.ReactElement => (
              <ExpensesPage
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
