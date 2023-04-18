import Layout from "@/components/layout";
import { Fragment, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Datatable from "@/components/datatable";

const Dashboard = () => {
  const { push } = useRouter();
  const { auth, loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      if (auth.Authenticate && auth.Role === "Admin") {
      } else {
        push("/");
      }
    }
  }, [loading]);

  useEffect(() => {}, []);
  return (
    <>
      <Layout title={"Dashboard"}>
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
};

export default Dashboard;
