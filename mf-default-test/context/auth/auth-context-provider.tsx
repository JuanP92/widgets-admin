import React, { useState, type ReactNode, useEffect } from 'react';
import { AuthContext, AuthContextType } from './auth-context';

export type AuthProviderProps = {
  children: ReactNode;
} & AuthContextType;

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthContextType['auth']>(null);

  useEffect(() => {
    if (window) {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    }
  }, []);

  const changeAuth = (authInfo: AuthContextType['auth']) => {
    setAuth(authInfo);
    if (window) {
      localStorage.setItem('auth', JSON.stringify(authInfo));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth(authInfo) {
          changeAuth(authInfo);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
