import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { Context } from '../types/index.type';

type LoginHandlerProps = {
  email: string;
  name: string;
  role: string;
};

type Website = {
  _id: string;
  name: string;
  url: string;
  category: string;
  logo: string;
  createdAt: Date | undefined;
};

const websiteIntial = {
  _id: '',
  name: '',
  url: '',
  category: '',
  logo: '',
  createdAt: undefined,
};

const userInital = {
  name: '',
  email: '',
  role: '',
};

const AuthContext = React.createContext<Context>({
  isLoggedIn: false,
  website: websiteIntial,
  user: userInital,
  onLogin: () => {},
  onLogout: () => {},
  onWebsiteSelect: () => {},
  onWebsiteReset: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(userInital);
  const [website, setWebsite] = useState<Website>(websiteIntial);
  const { sendRequest } = useHttp();
  const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/users`;

  const loginHandler = ({ email, name, role }: LoginHandlerProps) => {
    setUser({
      email: email,
      name: name,
      role: role,
    });

    setIsLoggedIn(true);
  };

  const resetWebsite = () => {
    setWebsite(websiteIntial);
  };

  const websiteSelectHandler = (website: Website) => {
    console.log(website);
    setWebsite({
      _id: website._id,
      name: website.name,
      url: website.url,
      category: website.category,
      logo: website.logo,
      createdAt: website.createdAt,
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
    const logout = (res: { status: string }) => {
      if (res.status === 'success') {
        setUser(userInital);
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
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
