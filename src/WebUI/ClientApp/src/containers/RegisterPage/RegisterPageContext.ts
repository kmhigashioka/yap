import React from 'react';
import { TRegisterPageContext } from './types';

const RegisterPageContext = React.createContext<TRegisterPageContext>({});

RegisterPageContext.displayName = 'RegisterPageContext';

export default RegisterPageContext;
