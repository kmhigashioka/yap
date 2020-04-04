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
      try {
        const data = await requestWithToken<T>(url, options);
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
