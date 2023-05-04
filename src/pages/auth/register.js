import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/authenticate/authContext";

export default function Register() {
  const { push } = useRouter();

  const { registerUser } = useAuthContext();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    repaetPassword: "",
  });

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      push("/");
    }
  }, []);

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, repeatPassword } = register;
    if ([name, email, password, repeatPassword].includes("")) {
      alert("Todos los campos son requeridos");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe contener al menos 6 caracteres");
      return;
    }

    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    //Creando usuario
    registerUser({
      name,
      email,
      password,
    });
  };
  return (
    <>
      <Head>
        <title>Challenge - Registrarse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pagina de registro en challenge app"
          key="desc"
        />
      </Head>
      <div className="sm w-full h-screen flex justify-center items-center">
        <div className="grid grid-cols-1 w-[80%] sm:w-4/6 md:w-1/2 lg:w-2/6">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full">
              <h1 className="text-black font-bold text-4xl md:text-5xl text-center py-4">
                Challenge
              </h1>
              <h2 className="my-2 font-medium text-2xl md:text-3xl">
                Regístrate
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="name"
                    className="block text-slate-800 text-md font-medium"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingrese su nombre"
                    className="w-full p-2 border-2 border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-slate-800 text-md font-medium"
                  >
                    Correo
                  </label>
                  <div className="">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Ingrese su correo"
                      className="w-full p-2 border-2 border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-slate-800 text-md font-medium"
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
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="check-password"
                    className="block text-slate-800 text-md font-medium"
                  >
                    Repetir contraseña
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
                      name="repeatPassword"
                      id="repeatPassword"
                      placeholder="Repita su contraseña"
                      className="w-full p-2 border-2 border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="my-5">
                  <input
                    type="submit"
                    value="Registrarse"
                    disabled={
                      register.name === "" ||
                      register.email === "" ||
                      register.password === "" ||
                      register.repeatPassword === ""
                        ? true
                        : false
                    }
                    className={` text-white border-2 font-medium bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 rounded-md w-full py-2 transition-colors ${
                      register.name === "" ||
                      register.email === "" ||
                      register.password === "" ||
                      register.repeatPassword === ""
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                </div>
              </form>
              <div>
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <p className="mr-1">¿Ya estás registrado?</p>
                    <Link
                      className="text-red-700 font-medium hover:underline"
                      href="/auth/login"
                    >
                      Inicia Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
