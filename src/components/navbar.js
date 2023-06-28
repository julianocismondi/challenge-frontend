import { useState } from "react";
import { useRouter } from "next/router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/context/authenticate/authContext";
import Button from "./button";

export default function Navbar() {
  const { authUser, closeSession } = useAuthContext();
  const { push } = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const handleCloseSesion = () => {
    closeSession();
    setNavOpen(false);
  };

  const handleClick = () => setNavOpen(!navOpen);
  return (
    <>
      <div className="w-full h-20 bg-gray-800 z-30 duration-300">
        <div className="px-6 sm:px-4 md:px-6 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
            <h1
              className="text-3xl font-bold mr-4 sm:text-4xl hover:cursor-pointer"
              onClick={() => {
                setNavOpen(false);
                push("/");
              }}
            >
              <span className="text-white">Challenge</span>
            </h1>
          </div>
          <div className="hidden sm:flex">
            {authUser.authenticate ? (
              <>
                {authUser.data.role.name === "Admin" ? (
                  <>
                    <Button
                      className="mr-2"
                      name="Dashboard"
                      href="/admin/dashboard"
                      type="secondary-solid"
                    />
                    <div className="px-2"></div>
                  </>
                ) : null}
                <button
                  href="#"
                  className="bg-red-600 border-2 border-red-600 rounded-md text-white font-medium py-2 px-8 hover:bg-transparent hover:text-red-600"
                  onClick={handleCloseSesion}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Button
                  name="Acceder"
                  href="/auth/login"
                  type="secondary-solid"
                />
                <div className="px-2"></div>
                <Button
                  name="Registrarse"
                  href="/auth/register"
                  type="primary-solid"
                />
              </>
            )}
          </div>

          <div onClick={handleClick} className="sm:hidden">
            {!navOpen ? (
              <Bars3Icon className="w-5 text-white cursor-pointer" />
            ) : (
              <XMarkIcon className="w-5 text-white cursor-pointer" />
            )}
          </div>
        </div>

        <div className="relative bg-white w-full shadow-lg">
          <ul className={!navOpen ? "hidden" : "px-8 sm:hidden"}>
            <div className="flex flex-col py-12">
              {authUser.authenticate ? (
                <>
                  {authUser.data.role.name === "Admin" ? (
                    <>
                      <Button
                        name="Dashboard"
                        href="/admin/dashboard"
                        type="secondary-outline"
                      />

                      <div className="py-2"></div>
                    </>
                  ) : null}
                  <button
                    className="bg-red-600 border border-red-600 rounded-md text-center text-white w-full py-2 transition-colors"
                    onClick={handleCloseSesion}
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Button
                    name="Acceder"
                    href="/auth/login"
                    type="secondary-outline"
                  />
                  <div className="py-2"></div>
                  <Button
                    name="Registrarse"
                    href="/auth/register"
                    type="primary-solid"
                  />
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
