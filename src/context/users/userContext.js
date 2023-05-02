import { createContext, useContext, useReducer } from "react";
import ClientAxios from "@/config/clientAxios";
import userReducer from "@/context/users/userReducer";
import { useRouter } from "next/router";

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

  //Obtiene una lista de usuarios
  const getUsers = async () => {
    dispatch({ type: "GET_USERS_REQUEST" });

    try {
      const response = await ClientAxios("/User/GetUsers");
      dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_USERS_ERROR", payload: error.message });
    }
  };

  //Obtiene una usuario por su Id
  const getUserById = async (userId) => {
    dispatch({ type: "GET_USER_BY_ID_REQUEST" });

    try {
      const response = await ClientAxios(`/User/GetUserById/${userId}`);
      dispatch({ type: "GET_USER_BY_ID_SUCCESS", payload: [response.data] });
    } catch (error) {
      dispatch({ type: "GET_USER_BY_ID_ERROR", payload: error.message });
    }
  };

  //Editar usuario
  const editUser = async (user) => {
    try {
      const response = await ClientAxios.put("/User/UpdateUser", user);
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
      const response = await ClientAxios.delete(`/User/DeleteUser/${userId}`);

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
