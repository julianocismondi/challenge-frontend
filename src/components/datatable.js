import { useState, useEffect } from "react";
import ClientAxios from "@/config/clientAxios";
import ModalFormEdit from "./modalFormEdit";

const Datatable = () => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const userContext = async () => {
      try {
        const response = await ClientAxios("/User/GetUsers", config);
        const { data } = response;
        setUsers(data);
      } catch (error) {}
    };
    userContext();
  }, []);

  const deleteUser = (id) => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (confirm(`Estas seguro de eliminar al usuario ${id}`)) {
      const deleteAsync = async () => {
        const response = await ClientAxios.delete(
          `/User/DeleteUser/${id}`,
          config
        );
        if (response.status === 204) {
          const getUsersAsync = async () => {
            const response = await ClientAxios("/User/GetUsers", config);
            const { data } = response;
            setUsers(data);
          };
          getUsersAsync();
        }
      };

      deleteAsync();
    }
  };

  const userEdit = (id) => {
    setShowFormEdit(true);
    setUserId(id);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 py-2">Usuarios</h2>
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-xl sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Correo
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Rol
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {users.map((user, index) => {
                      return (
                        <tr className="hover:bg-gray-700" key={index + 1}>
                          <td className="py-4 px-6 text-sm font-medium text-white text-center">
                            {user.id}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-white text-center">
                            {user.name}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-white text-center">
                            {user.email}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-white text-center">
                            {user.roleId === 1 ? "Admin" : "User"}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-center">
                            <button
                              className="text-gray-500 mr-2 hover:underline"
                              onClick={() => {
                                userEdit(user.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteUser(user.id);
                              }}
                              className="text-red-500 mr-2  hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <ModalFormEdit
          open={showFormEdit}
          setOpen={setShowFormEdit}
          setUsers={setUsers}
          userId={userId}
        />
      }
    </>
  );
};

export default Datatable;
