import React from 'react';
import { IntlProvider } from 'react-intl';
import { LanguageContextProvider } from './LanguageContext';
import { LanguageProps } from './types';

const Language: React.FC<LanguageProps> = ({ children, messages }) => {
  const [localeLanguage] = navigator.language.split('-');
  const [locale, setLocale] = React.useState(localeLanguage);

  return (
    <LanguageContextProvider setLocale={setLocale}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContextProvider>
  );
};

export default Language;
