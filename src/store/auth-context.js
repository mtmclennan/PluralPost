import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';

const AuthContext = React.createContext({
  isLoggedIn: false,
  website: {},
  user: {},
  onLogin: (user) => {},
  onLogout: () => {},
  onWebsiteSelect: () => {},
  onWebsiteReset: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [website, setWebsite] = useState({});
  const { sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users`;

  const loginHandler = (data) => {
    setUser({
      email: data.email,
      name: data.name,
      role: data.role,
    });

    setIsLoggedIn(true);
  };

  const resetWebsite = () => {
    setWebsite({});
  };

  const websiteSelectHandler = (website) => {
    const { data } = website;

    setWebsite({
      _id: data._id,
      name: data.name,
      url: data.url,
      category: data.category,
      logo: data.logo,
      createAt: data.createAt,
    });
  };
  useEffect(() => {
    sendRequest(
      {
        url: `${SERVER_URL}/getUser`,
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
  }, [sendRequest, SERVER_URL]);

  const logoutHandler = () => {
    const logout = (res) => {
      if (res.status === 'success') {
        setUser({});
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}/logout`,
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
        onWebsiteSelect: websiteSelectHandler,
        onWebsiteReset: resetWebsite,
        website,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
