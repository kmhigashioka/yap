import React from 'react';
import { Helmet } from 'react-helmet-async';
import HomePageContext from './HomePageContext';
import AppBar from './AppBar';
import { Account } from './types';

const HomePage = (): React.ReactElement => {
  const [accounts] = React.useState<Account[]>([
    { id: 1, name: 'Bank Developer Option', abbreviation: 'BDO' },
    {
      id: 2,
      name: 'Bank of the Personal Information',
      abbreviation: 'BPI',
    },
  ]);
  const [activeAccount, setActiveAccount] = React.useState<Account | null>(
    null,
  );

  return (
    <HomePageContext.Provider value={{}}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <div>
        <AppBar
          accounts={accounts}
          activeAccount={activeAccount}
          setActiveAccount={setActiveAccount}
        />
      </div>
    </HomePageContext.Provider>
  );
};

export default HomePage;
