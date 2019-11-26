import React from 'react';
import { THomePageContext } from './types';

const HomePageContext = React.createContext<THomePageContext | undefined>(
  undefined,
);

HomePageContext.displayName = 'HomePageContext';

export default HomePageContext;
