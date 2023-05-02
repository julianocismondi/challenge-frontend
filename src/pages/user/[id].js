import Layout from "@/components/layout";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/users/userContext";

export default function User() {
  const { users, getUserById, editUser } = useUserContext();
  const { query, push } = useRouter();
  const [checkAdmin, setCheckAdmin] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    roleId: null,
  });

  useEffect(() => {
    if (query.id !== undefined) {
      getUserById(query.id);
      localStorage.setItem("editUserId", query.id);
    } else {
      getUserById(localStorage.getItem("editUserId"));
    }
  }, []);

  useEffect(() => {
    setCurrentUser({ ...currentUser, roleId: checkAdmin ? 1 : 2 });
  }, [checkAdmin]);

  useEffect(() => {
    if (!users?.loading && users) {
      setCurrentUser(users.data[0]);
      setCheckAdmin(users.data[0].roleId === 1 ? true : false);
    }
  }, [users]);

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(currentUser);
  };

  const handleCancel = () => {
    localStorage.removeItem("editUserId");
    push("/admin/dashboard");
  };
  return (
    <>
      <Layout title={"Editar Usuario"}>
        <Fragment>
            <div className="flex justify-center py-6 sm:px-6 lg:px-8">
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="text-slate-800 block text-md"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={currentUser.name}
                      className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="text-slate-800 block text-md"
                    >
                      Email
                    </label>
                    <div className="relative block">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                        value={currentUser.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={checkAdmin}
                          readOnly
                          onClick={() => {
                            setCheckAdmin(!checkAdmin);
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          Usuario Administrador
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 flex py-4">
                    <button
                      type="button"
                      className="bg-transparent border-2 border-gray-800 text-gray-800 text-center font-medium rounded-md py-2 px-8 hover:bg-gray-800 hover:text-white transition-colors"
                      onClick={() => handleCancel()}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="ml-4 bg-red-600 border-2 border-red-600  text-white text-center font-medium rounded-md py-2 px-8 hover:bg-transparent hover:text-red-600 transition-colors"
                      onClick={() => {
                        push("/admin/dashboard");
                      }}
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </Fragment>
      </Layout>
    </>
  );
}
