import axios from "axios";

const ClientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH
});

export default ClientAxios;