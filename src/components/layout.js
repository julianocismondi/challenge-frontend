import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const { auth, loading } = useAuth();
  useEffect(() => {
    console.log("layout")
    console.log(auth)
  }, []);

  return (
    <>
      <Head>
        <title>{`Challenge - ${title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      {/* <Header/> */}
      {children}
      <Footer />
    </>
  );
}
