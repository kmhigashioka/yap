import { useHistory } from 'react-router-dom';
import { requestWithToken } from './request';

interface UseFetch {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestWithToken: <T>(url: string, options?: any) => Promise<T>;
}

export default (): UseFetch => {
  const history = useHistory();

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestWithToken: async <T>(url: string, options?: any): Promise<T> => {
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
  };
};
