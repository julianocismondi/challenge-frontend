import { createContext, useContext, useReducer } from "react";
import authReducer from "@/context/authenticate/authReducer";
import ClientAxios from "@/config/clientAxios";
import { useRouter } from "next/router";
import axios from "axios";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { push } = useRouter();
  var initialState = {
    data: {},
    loading: false,
    authenticate: false,
    error: false,
  };
  const [authUser, dispatch] = useReducer(authReducer, initialState);

  const getProfile = async () => {
    dispatch({ type: "GET_PROFILE_REQUEST" });

    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/Auth/GetProfile`,
        {
          headers: headers,
        }
      );
      dispatch({ type: "GET_PROFILE_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_PROFILE_ERROR", payload: error.message });
    }
  };

  const registerUser = async (credentials) => {
    dispatch({ type: "REGISTER_REQUEST" });

    try {
      const response = await ClientAxios.post("/User/CreateUser", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      push("/auth/login");
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR", payload: error.message });
    }
  };

  const loginUser = async (credentials) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await ClientAxios.post("/Auth/Login", credentials);
      localStorage.setItem("token", response.data);
      localStorage.setItem("authenticate", true);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      getProfile();
      push("/admin/dashboard");
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage: error.response.data.message,
          errorStatus: error.response.status,
        },
      });
    }
  };

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authenticate");
    dispatch({ type: "CLOSE_SESSION", payload: initialState });
    push("/");
  };

  return (
    <AuthContext.Provider
      value={{ authUser, loginUser, registerUser, getProfile, closeSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
