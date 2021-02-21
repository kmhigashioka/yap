import React from 'react';
import { TLanguageContext } from './types';

export const LanguageContext = React.createContext<
  TLanguageContext | undefined
>(undefined);

LanguageContext.displayName = 'LanguageContext';

export function useLanguageContext(): TLanguageContext {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      'useHomePageContext must be used within a LanguageContextProvider',
    );
  }
  return context;
}

export function LanguageContextProvider({
  children,
  setLocale,
}: {
  children: React.ReactNode;
  setLocale: (locale: string) => void;
}): React.ReactElement {
  const value = { setLocale };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
