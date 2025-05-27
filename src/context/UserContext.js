import React from "react";

// @function  UserContext
const UserContext = React.createContext({ email: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });

  const loginContext = (email) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("user-email", email);
  };

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
