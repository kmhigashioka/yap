import * as React from 'react';
import { TCategoryPageContext } from './types';

export const CategoryPageContext = React.createContext<
  TCategoryPageContext | undefined
>(undefined);

CategoryPageContext.displayName = 'CategoryPageContext';

export function useCategoryPageContext(): TCategoryPageContext {
  const context = React.useContext(CategoryPageContext);
  if (context === undefined) {
    throw new Error(
      'useCategoryPageContext should be used within CategoryPageContextProvider',
    );
  }
  return context;
}

export function CategoryPageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const value = {};
  return (
    <CategoryPageContext.Provider value={value}>
      {children}
    </CategoryPageContext.Provider>
  );
}
