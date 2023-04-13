import { Inter } from "next/font/google";
import Layout from "../components/layout";
import { useAuth } from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { auth, loading } = useAuth();
  if (loading)
    return (
      <>
        <h1>Cargando</h1>
      </>
    );
  return (
    <>
      <Layout title={"Inicio"} description={"Challenge web"}>
        <main>
          <h1>Hola mundo</h1>
        </main>
      </Layout>
    </>
  );
}
