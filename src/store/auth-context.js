import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {},
  onLogin: (user) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const { isLoading, error, sendRequest } = useHttp();

  const loginHandler = (data) => {
    setUser({
      email: data.email,
      name: data.name,
      role: data.role,
    });

    setIsLoggedIn(true);
  };
  useEffect(() => {
    sendRequest(
      {
        url: 'http://localhost:3030/api/v1/users/getUser',
      },
      (data) => {
        setUser({
          email: data.data.email,
          name: data.data.name,
          role: data.data.role,
        });
        if (data) {
          setIsLoggedIn(true);
        }
      }
    );
    console.log('sending');
  }, [sendRequest]);

  const logoutHandler = () => {
    const logout = (res) => {
      if (res.status === 'success') {
        setUser({});
      }
    };

    sendRequest(
      {
        url: 'http://localhost:3030/api/v1/users/logout',
      },
      logout
    );

    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
