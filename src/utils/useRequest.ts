/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import request, { ResponseError } from './request';

interface UseRequest<T> {
  data: T | null | undefined;
  error: ResponseError | null;
  loading: boolean;
}

const useRequest = <T>(
  { url, options }: { url: string; options?: {} | undefined },
  dependencies: any[],
): UseRequest<T> => {
  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setData(await request<T>(url, options));
      setLoading(false);
    };
    try {
      fetchData();
    } catch (e) {
      setError(e);
    }
  }, [...dependencies, setData, setLoading, setError, url]);

  return {
    error,
    data,
    loading,
  };
};

export default useRequest;
