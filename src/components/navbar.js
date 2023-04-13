import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { auth, setAuth, initialState } = useAuth();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {}, []);

  const handleCloseSesion = () => {
    localStorage.clear();
    setAuth(initialState);
    router.push("/");
  };

  const navBarTransparentClass =
    "w-full h-16 fixed bg-trasparent z-30 duration-300";
  const navBarClass = "w-full h-16 fixed bg-zinc-100 z-30 duration-300";
  const handleClick = () => setNavOpen(!navOpen);
  return (
    <>
      <div className="w-full h-16 bg-zinc-100 z-30 duration-300">
        <div className="px-6 sm:px-4 md:px-6 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
            <h1
              className="text-3xl font-bold mr-4 sm:text-4xl hover:cursor-pointer"
              onClick={()=>{router.push("/")}}
            >
              <span className="text-black">Challenge</span>
            </h1>
          </div>

          <div className="hidden md:flex pr-4">
            {auth.Authenticate ? (
              <>
                {auth.Role === "Admin" ? (
                  <Link
                    href="/admin/dashboard"
                    className="bg-transparent border border-blue-600 rounded-md text-blue-600 py-2 px-8 mr-2 hover:bg-transparent"
                  >
                    Dashboard
                  </Link>
                ) : null}
                <button
                  href="#"
                  className="bg-red-600 border border-red-600 rounded-md text-zinc-100 py-2 px-8 hover:bg-transparent hover:text-red-600"
                  onClick={handleCloseSesion}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  className="bg-transparent border border-gray-900 rounded-md py-2 px-8 mr-4"
                  href="/auth/login"
                >
                  {" "}
                  Acceder
                </Link>
                <Link
                  className="bg-red-600 border border-red-600 rounded-md text-zinc-100 py-2 px-8 hover:bg-transparent hover:text-red-600"
                  href="/auth/register"
                >
                  {" "}
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <div onClick={handleClick} className="md:hidden">
            {!navOpen ? (
              <Bars3Icon className="w-5 cursor-pointer" />
            ) : (
              <XMarkIcon className="w-5 cursor-pointer" />
            )}
          </div>
        </div>

        <div className="relative">
          <ul
            className={
              !navOpen ? "hidden" : "bg-zinc-100 w-full px-8 md:hidden"
            }
          >
            <a
              onClick={() => setNavOpen(!navOpen)}
              href="#"
              className="border-b-2 block w-full p-2 border-zinc-300 hover:text-red-700"
            >
              Inicio
            </a>
            <a
              onClick={() => setNavOpen(!navOpen)}
              href="#"
              className="border-b-2 block w-full p-2 border-zinc-300 hover:text-red-700"
            >
              Nosotros
            </a>
            <a
              onClick={() => setNavOpen(!navOpen)}
              href="#"
              className="border-b-2 block w-full p-2 border-zinc-300 hover:text-red-700 items-center"
            >
              Noticias
            </a>

            <div className="flex flex-col my-4">
              {auth.Authenticate ? (
                <button
                  className="bg-red-600 text-slate-200 text-center border border-red-600 rounded-md w-full py-2 mb-4 transition-colors"
                  onClick={handleCloseSesion}
                >
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  {" "}
                  <Link
                    className="bg-transparent text-red-600 text-center border border-red-600 rounded-md w-full py-2 mb-4 transition-colors"
                    href="#"
                  >
                    Acceder
                  </Link>
                  <Link
                    className="bg-red-600 text-slate-200 text-center border border-red-600 rounded-md w-full py-2 mb-4 transition-colors"
                    href="#"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
