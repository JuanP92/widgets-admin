import { createContext } from 'react';

export type AuthContextType = {
  auth?: {
    email: string;
    password: string;
  } | null;
  setAuth?: (auth: { email: string; password: string }) => void;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});
