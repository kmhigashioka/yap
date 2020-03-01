import { useHistory } from 'react-router-dom';
import { requestWithToken } from './request';

interface UseFetch {
  requestWithToken: <T>(url: string, options?: any) => Promise<T>;
}

export default (): UseFetch => {
  const history = useHistory();

  return {
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
