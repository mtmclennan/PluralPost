import { useState, useCallback } from 'react';

interface RequestConfig {
  url: string;
  method?: 'POST' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: any;
  photo?: Boolean;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  type ApplyData = (Promise: any) => void;

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: ApplyData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.photo
            ? requestConfig.body
            : requestConfig.body && !requestConfig.photo
            ? JSON.stringify(requestConfig.body)
            : null,

          credentials: 'include',
        });

        if (!response.ok) {
          const res = await response.json();

          throw new Error(res.message);
        }

        if (response.status === 204) {
          const data = { status: 'success' };
          applyData(data);
        } else {
          const data = await response.json();

          applyData(data);
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong!');
        console.log(err.message);
      }
      setIsLoading(false);
    },
    []
  );
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
