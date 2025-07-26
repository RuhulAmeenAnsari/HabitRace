import React from "react";
import { createContext, useState } from "react";
export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    username: "",
    email: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
