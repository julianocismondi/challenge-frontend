import Layout from "@/components/layout";
import { Fragment, useEffect } from "react";
import { useAuthContext } from "@/context/authenticate/authContext";
import { useUserContext } from "@/context/users/userContext";
import { useRouter } from "next/router";
import Datatable from "@/components/datatable";

export default function Dashboard() {
  const { push } = useRouter();
  const { getUsers } = useUserContext();
  const { authUser, getProfile } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!authUser.authenticate && token) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (authUser.data.role === "Admin") {
      getUsers();
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser.data.role === "User") {
      push("/");
    }
  }, [authUser]);

  return (
    <>
      <Layout title={"Dashboard"} description={"Panel de administrador de challenge app"}>
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
