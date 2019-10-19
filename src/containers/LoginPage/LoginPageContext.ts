import React from 'react';
import { TLoginPageContext } from './types';

const LoginPageContext = React.createContext<TLoginPageContext>({});

LoginPageContext.displayName = 'LoginPageContext';

export default LoginPageContext;
