import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  var initialState = {
    UserId: "",
    Email: "",
    Role: "",
    Authenticate: false,
  };
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(initialState);

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
        const { data } = await axios.get(
          "https://localhost:7024/Auth/GetProfile",
          config
        );
        const { id, email, role } = data;
        setAuth({ UserId: id, Email: email, Role: role, Authenticate: true });
        // navigate("/admin");
        // setUserAuth(data);
      } catch (error) {
        setAuth(initialState);
      } finally {
        setLoading(false);
      }
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, initialState }}>
      {children}
    </AuthContext.Provider>
  );
};
