import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  // AuthContext is an object that will contain a component
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
// Now with this, 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // this will only run once, when the app starts since the dependencies never change,
    // since there are NO dependencies (in the empty array arg below)
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true); // we need to execute this inside useEffect() to avoid an infinite loop
    }
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1"); 
    // 1 is meant to be "loggedIn" and 0 will be "notLoggedIn"
    // takes 2 string args
    // this is a storage object available in the browser (independenct of React)
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
