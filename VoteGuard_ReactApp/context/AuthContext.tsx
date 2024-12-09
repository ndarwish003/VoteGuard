// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true); // Updates the logged-in state
  const logout = () => setIsLoggedIn(false); // Updates the logged-out state

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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