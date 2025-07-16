import React, { useCallback } from "react";

// @function  UserContext
const UserContext = React.createContext({ email: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });

  const loginContext = useCallback((email) => {
    setUser({
      email: email,
      auth: true,
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("user-email");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
