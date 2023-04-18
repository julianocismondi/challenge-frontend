import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ClientAxios from "@/config/clientAxios";

export default function ModalFormEdit({ open, setOpen, userId, setUsers }) {
  const [checkAdmin, setCheckAdmin] = useState(false);

  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    email: "",
    roleId: "",
  });
  useEffect(() => {
    setEditUser({ ...editUser, roleId: checkAdmin ? 1 : 2 });
  }, [checkAdmin]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getUserByIdAsync = async () => {
      const response = await ClientAxios(`/User/GetUserById/${userId}`, config);

      if (response.status === 200) {
        const { data } = response;
        setCheckAdmin(data.roleId === 1 ? true : false);
        setEditUser(data);
      }
    };
    if (userId !== 0) {
      getUserByIdAsync();
    }
  }, [userId]);
  const cancelButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const editUserAsync = async () => {
      const response = await ClientAxios.put(
        `/User/UpdateUser`,
        editUser,
        config
      );

      if (response.status === 200) {
        const getUsersAsync = async () => {
          const response = await ClientAxios("/User/GetUsers", config);
          const { data } = response;
          setUsers(data);
        };
        getUsersAsync();
      }
    };

    editUserAsync();
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex justify-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base text-center font-semibold leading-6 text-gray-900"
                      >
                        Editar usuario
                      </Dialog.Title>
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
                              value={editUser.name}
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
                                value={editUser.email}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="mt-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value=""
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
                              onClick={() => setOpen(false)}
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="ml-4 bg-red-600 border-2 border-red-600  text-white text-center font-medium rounded-md py-2 px-8 hover:bg-transparent hover:text-red-600 transition-colors"
                              onClick={() => setOpen(false)}
                            >
                              Guardar Cambios
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
