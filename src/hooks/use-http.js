import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.photo
          ? requestConfig.body
          : requestConfig.body
          ? JSON.stringify(requestConfig.body)
          : null,
        // body: requestConfig.body,
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
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      console.log(err.message);
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
