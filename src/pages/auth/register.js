import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const { push } = useRouter();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    repaetPassword: "",
  });

  const [showPass, setShowPass] = useState(false);

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
    const objUser = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://localhost:7024/User/CreateUser",
        objUser
      );

      if (response.status == 204) {
        push("/auth/login");
      }
      setRegister({});
    } catch (error) {
      alert("Error al crear usuario");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 w-[90%] md:w-3/5 lg:w-2/6 md:mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full">
            <h1 className="text-black font-bold text-4xl md:text-5xl text-center py-4">
              Challenge
            </h1>
            <h2 className="my-2 text-2xl md:text-3xl">Regístrate</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-slate-800 text-md">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ingrese su nombre"
                  className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="block text-slate-800 text-md">
                  Correo
                </label>
                <div className="">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="tucorreo@gmail.com"
                    className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-slate-800 text-md"
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
                    className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="check-password"
                  className="block text-slate-800 text-md"
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
                    className="w-full p-2 border border-red-700 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-700"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="my-5">
                <input
                  type="submit"
                  value="Registrarse"
                  className="text-slate-200 border bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700 rounded-md w-full py-2 transition-colors"
                />
              </div>
            </form>
            <nav>
              <Link
                className="block text-slate-800 text-center my-2 text-sm"
                href="/auth/login"
              >
                ¿Ya estás registrado?{" "}
                <span className="text-red-700 font-medium hover:underline">
                  Inicia Sesión
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
