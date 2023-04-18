import { createContext, useContext } from "react";
export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const userContext = () => {
  return <div>userContext</div>;
};

export default userContext;
