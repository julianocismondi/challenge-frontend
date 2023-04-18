import Head from "next/head";
import Navbar from "./navbar";
import { useAuth } from "@/context/authContext";

export default function Layout({ children, title, description }) {
  const { auth } = useAuth();

  return (
    <>
      <Head>
        <title>{`Challenge - ${title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <header className="bg-gray-200 shadow-lg">
        <div className="w-full flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-gray-900">
            {title}
          </h2>
          {auth.Authenticate ? (
            <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl">
              Bienvenido {auth.Name}
            </h3>
          ) : null}
        </div>
      </header>

      {children}
    </>
  );
}
