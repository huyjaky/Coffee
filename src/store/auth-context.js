import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  
  const [authToken, setAuthToken] = useState(false);

  function login() {
    setAuthToken(true);
  }

  function logout() {
    setAuthToken(false);
  }

  const value = {
    isAuthenticated: !!authToken,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
