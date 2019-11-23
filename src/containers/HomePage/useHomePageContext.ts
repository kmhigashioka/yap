import React from 'react';
import HomePageContext from './HomePageContext';
import { THomePageContext } from './types';

const useHomePageContext = (): THomePageContext => {
  const state = React.useContext(HomePageContext);
  return state;
};

export default useHomePageContext;
