import React, { useState, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import Modal from '../../components/ui/modal/Modal';

/**
 * Higher-Order Component that provides global error handling for API requests
 *
 * @param WrappedComponent - Component to be wrapped with error handling
 * @param axios - Axios instance to intercept requests/responses
 * @returns A new component with error handling capabilities
 */
const withErrorHandler = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  axios: AxiosInstance
) => {
  return (props: P) => {
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      // Request interceptor to clear errors when making new requests
      const reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });

      // Response interceptor to catch errors
      const resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          setError(err);
          return Promise.reject(err);
        }
      );

      // Clean up interceptors when component unmounts
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={!!error} modalClosed={errorConfirmedHandler} title="An Error Occurred">
          {error ? error.message || 'Something went wrong' : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
