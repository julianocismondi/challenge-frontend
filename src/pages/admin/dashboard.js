import Layout from "@/components/layout";
import { Fragment, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { push } = useRouter();
  const { auth, loading } = useAuth();
  useEffect(() => {
    console.log(auth);
    if(!loading){
      if(auth.Authenticate && auth.Role === 'Admin'){

      }
      else{
        push("/")
      }
    }

   
  }, [loading]);
  return (
    <>
      <Layout title={"Dashboard"}>
        <Fragment>
          <div>Dashboard</div>
          <h1>{auth.Email}</h1>
        </Fragment>
      </Layout>
    </>
  );
};

export default Dashboard;
