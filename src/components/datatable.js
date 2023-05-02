import Button from "./button";
import { useUserContext } from "@/context/users/userContext";
import Spinner from "./spinner";

const Datatable = () => {
  const { users, getUsers, deleteUser } = useUserContext();

  const handleClick = (userId) => {
    deleteUser(userId);
  };

  if (users.loading) {
    return (<Spinner />);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
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
                    {users.data.map((user, index) => {
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
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                              {" "}
                              <Button
                                name="Editar"
                                href={`/user/${user.id}`}
                                type="secondary-solid"
                              />
                              <button
                                onClick={() => {
                                  handleClick(user.id);
                                }}
                                className="bg-red-600 border-2 border-red-600  text-white text-center font-medium rounded-md py-2 px-8 hover:bg-transparent hover:text-red-600 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
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
    </>
  );
};

export default Datatable;
