import axios from "axios";

const clientConfig = () => {
  if (typeof Storage !== "undefined") {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return headers;
  }
};

export const existToken = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const ClientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH,
  headers: clientConfig(),
});

export default ClientAxios;
