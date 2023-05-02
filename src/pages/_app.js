import { AuthProvider } from "@/context/authenticate/authContext";
import { UserProvider } from "@/context/users/userContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </>
  );
}
