import React, { useState, useEffect } from 'react';
import AuthContext from './authContext';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    login();
  }, [])
  
  const login = () => {
    // logic to check authentication using cookies
    
    if(cookies.get('jwtToken'))
    setIsAuthenticated(true);
  };

  const logout = () => {
    // logic to clear cookies
    cookies.remove('jwtToken', "/")
    
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;