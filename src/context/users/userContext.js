import { createContext, useContext, useReducer } from "react";
import userReducer from "@/context/users/userReducer";
import { useRouter } from "next/router";
import axios from "axios";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  //Estado inicial
  const initialState = {
    data: [],
    loading: true,
    error: false,
  };

  const { push } = useRouter();

  const [users, dispatch] = useReducer(userReducer, initialState);

  //Axios config
  const clientConfig = () => {
    if (typeof Storage !== "undefined") {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      return headers;
    }
  };

  const clientAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
    headers: clientConfig(),
  });

  //Obtiene una lista de usuarios
  const getUsers = async () => {
    dispatch({ type: "GET_USERS_REQUEST" });

    try {
      const response = await clientAxios("/User/GetUsers");
      dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_USERS_ERROR", payload: error.message });
    }
  };

  //Obtiene una usuario por su Id
  const getUserById = async (userId) => {
    dispatch({ type: "GET_USER_BY_ID_REQUEST" });

    try {
      const response = await clientAxios(`/User/GetUserById/${userId}`);
      dispatch({ type: "GET_USER_BY_ID_SUCCESS", payload: [response.data] });
    } catch (error) {
      dispatch({ type: "GET_USER_BY_ID_ERROR", payload: error.message });
    }
  };

  //Editar usuario
  const editUser = async (user) => {
    try {
      const response = await clientAxios.put("/User/UpdateUser", user);
      localStorage.removeItem("editUserId");
      push("/admin/dashboard");
      dispatch({ type: "EDIT_USER_SUCCESS", payload: response.data });
      getUsers();
    } catch (error) {
      dispatch({ type: "EDIT_USER_ERROR", payload: error.message });
    }
  };

  //Eliminar usuario
  const deleteUser = async (userId) => {
    dispatch({ type: "DELETE_USER_REQUEST" });
    try {
      const response = await clientAxios.delete(`/User/DeleteUser/${userId}`);

      dispatch({ type: "DELETE_USER_SUCCESS", payload: initialState.data });
      getUsers();
    } catch (error) {
      dispatch({ type: "DELETE_USER_ERROR", payload: error.message });
    }
  };

  return (
    <UserContext.Provider
      value={{ users, getUsers, getUserById, editUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
