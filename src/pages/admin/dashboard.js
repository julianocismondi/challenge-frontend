import Layout from "@/components/layout";
import { Fragment, useEffect } from "react";
import { useAuthContext } from "@/context/authenticate/authContext";
import Datatable from "@/components/datatable";

export default function Dashboard() {
  const { authUser, getProfile } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!authUser.authenticate && token) {
      getProfile();
    }
  }, []);

  if (authUser.data.role?.id == 2) {
    return (
      <>
        <div className="flex h-screen w-full justify-center items-center">
          <h1 className="text-3xl">
            No tienes permisos para ver esta pagina :´(
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Layout
        title={"Dashboard"}
        description={"Panel de administrador de challenge app"}
      >
        <Fragment>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Datatable />
            </div>
          </main>
        </Fragment>
      </Layout>
    </>
  );
}
