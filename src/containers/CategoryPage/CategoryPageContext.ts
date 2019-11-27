import React from 'react';
import { TCategoryPageContext } from './types';

const CategoryPageContext = React.createContext<TCategoryPageContext | undefined>(undefined);

CategoryPageContext.displayName = 'CategoryPageContext';

export const useCategoryPageContext = (): TCategoryPageContext => {
  const context = React.useContext(CategoryPageContext);
  if (context === undefined) {
    throw new Error('useCategoryPageContext should be used within CategoryPageContextProvider');
  }
  return context;
};

export default CategoryPageContext;
