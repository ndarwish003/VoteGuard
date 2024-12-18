// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setAdmin: (isAdmin: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const setAdmin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, setAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) 
    {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export const useAdmin = () => useContext(AuthContext);