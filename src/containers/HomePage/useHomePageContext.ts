import React from 'react';
import HomePageContext from './HomePageContext';
import { THomePageContext } from './types';

const useHomePageContext = (): THomePageContext => {
  const context = React.useContext(HomePageContext);
  if (context === undefined) {
    throw new Error(
      'useHomePageContext must be used within a HomePageContextProvider',
    );
  }
  return context;
};

export default useHomePageContext;
