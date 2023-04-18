import React, { useState, useEffect } from "react";
import ModalFormEdit from "./modalFormEdit";
import ClientAxios from "@/config/clientAxios";

const UpdateUser = ({ userId }) => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const getUserByIdAsync = async () => {
      const response = await ClientAxios(
        `/User/GetUserById/${userId}`,
        config
      );
      const { data } = response;
      setUser(data);
      setModal(true);
    };
    getUserByIdAsync();
  }, [userId]);
  return <ModalFormEdit open={modal} />;
};

export default UpdateUser;
