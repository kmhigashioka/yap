import React from 'react';
import { useHistory } from 'react-router-dom';
import { requestWithToken } from './request';

interface UseFetch {
  requestWithToken: <T>(url: string, options?: any) => Promise<T>;
}

export default (): UseFetch => {
  const history = useHistory();

  const requestWithTokenFn = React.useCallback(
    async <T>(url: string, options?: any): Promise<T> => {
      const requestUrl =
        url.indexOf('http') === 0
          ? url
          : `${process.env.REACT_APP_API_URL || ''}${url}`;
      try {
        const data = await requestWithToken<T>(requestUrl, options);
        return data;
      } catch (error) {
        if (error.message === 'Expired session.') {
          history.push('/login');
        }
        throw error;
      }
    },
    [history],
  );

  return {
    requestWithToken: requestWithTokenFn,
  };
};
