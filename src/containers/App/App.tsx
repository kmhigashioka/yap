import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { AppProps } from './types';
import AppContext from './AppContext';

import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100vh;
`;

const App: React.FC<AppProps> = () => (
  <AppContext.Provider value={{}}>
    <Helmet
      titleTemplate="%s - react-jump-start"
      defaultTitle="react-jump-start"
    >
      <meta name="description" content="" />
    </Helmet>
    <Wrapper>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Wrapper>
  </AppContext.Provider>
);

export default App;
