import ClientAxios from "@/config/clientAxios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  var initialState = {
    UserId: "",
    Name: "",
    Email: "",
    Role: "",
    Authenticate: false,
  };
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(initialState);
  const [updateToken, setUpdateToken] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await ClientAxios("/Auth/GetProfile", config);

        const { id, name, email, role } = data;
        setAuth({
          UserId: id,
          Name: name,
          Email: email,
          Role: role,
          Authenticate: true,
        });
      } catch (error) {
        setAuth(initialState);
      } finally {
        setLoading(false);
      }
    };

    authUser();
  }, [updateToken]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, initialState, setUpdateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
