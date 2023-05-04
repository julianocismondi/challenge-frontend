import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Alert from "@/components/alert";
import { useAuthContext } from "@/context/authenticate/authContext";

export default function Login() {
  const { authUser, loginUser } = useAuthContext();
  const { push } = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      push("/");
      return;
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(credentials);
  };

  return (
    <>
      <Head>
        <title>Challenge - Inicio de Sesión</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pagina de inicio de sesión de challenge app"
          key="desc"
        />
      </Head>
      <div className="w-full h-screen flex bg-white">
        <div className="grid grid-cols-1 w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto">
          <div className="flex flex-col justify-center items-center">
            {authUser.error ? (
              <Alert
                title="Error"
                message={authUser.data.errorMessage}
                type="error"
              />
            ) : null}
            <div className="w-full">
              <h1 className="text-black font-bold text-4xl md:text-5xl text-center py-4">
                Challenge
              </h1>
              <h2 className="text-2xl md:text-3xl py-4 font-medium">
                Inicia Sesión
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="text-slate-800 block text-md font-medium"
                  >
                    Correo
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingrese su correo"
                    className="w-full p-2 border-2 border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="text-slate-800 block text-md font-medium"
                  >
                    Contraseña
                  </label>
                  <div className="relative block">
                    {!showPass ? (
                      <EyeIcon
                        onClick={() => setShowPass(!showPass)}
                        className="cursor-pointer w-6 absolute top-1/2 transform -translate-y-1/2 right-2 text-red-700"
                      />
                    ) : (
                      <EyeSlashIcon
                        onClick={() => setShowPass(!showPass)}
                        className="cursor-pointer w-6 absolute top-1/2 transform -translate-y-1/2 right-2 text-red-700"
                      />
                    )}
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Ingrese su contraseña"
                      className="w-full p-2 border-2 border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="my-5">
                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    disabled={
                      credentials.email === "" || credentials.password === ""
                        ? true
                        : false
                    }
                    className={` text-white border-2 font-medium bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 rounded-md w-full py-2 transition-colors ${
                      credentials.email === "" || credentials.password === ""
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                </div>
              </form>
              <div className="flex justify-center">
                <div className="flex items-center">
                  <p className="mr-1">¿No tienes una cuenta? </p>
                  <Link
                    className="text-red-700 font-medium hover:underline"
                    href="/auth/register"
                  >
                    Regístrate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
