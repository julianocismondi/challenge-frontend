import { Inter } from "next/font/google";
import Layout from "../components/layout";
import Button from "@/components/button";
import { useEffect } from "react";
import { useAuthContext } from "@/context/authenticate/authContext";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { authUser, getProfile } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!authUser.authenticate && token) {
      getProfile();
    }
  }, []);
  return (
    <>
      <Layout title={"Inicio"} description={"Home Page Challenge web"}>
        <main>
          <div className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl py-28 px-2 sm:py-6 sm:px-8 md:py-8">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                CRUD de usuarios con autenticación, autorización y roles
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              {authUser.authenticate ? null : (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button
                    name="Acceder"
                    href="/auth/login"
                    type="primary-outline"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
