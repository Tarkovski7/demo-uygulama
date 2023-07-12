import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteUserPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        await axios.delete(`/api/users/${user_id}`);
        console.log("Kullanıcı silindi");
        navigate("/");
      } catch (error) {
        console.error("Silinirken hata oluştu:", error);
      }
    };

    deleteUser();
  }, [user_id, navigate]);

  return (
    <div>
      <h1>Kişiyi Sil</h1>
      <p>Kişi Siliniyor...</p>
    </div>
  );
};

export default DeleteUserPage;
