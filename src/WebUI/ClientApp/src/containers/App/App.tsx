import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { makeStyles } from '@material-ui/styles';

import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Notification from '../Notification';

const useStyles = makeStyles({
  wrapper: {
    minHeight: '100vh',
    height: '100vh',
  },
});

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <Helmet
        titleTemplate="%s - react-jump-start"
        defaultTitle="react-jump-start"
      >
        <meta name="description" content="" />
      </Helmet>
      <div className={styles.wrapper}>
        <Notification>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Notification>
      </div>
    </>
  );
};

export default App;
