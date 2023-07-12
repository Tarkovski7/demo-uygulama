import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState({
    userAccountRead: false,
    userAccountCreate: false,
    userAccountUpdate: false,
    userAccountDelete: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Kullanıcılar alınırken hata oluştu:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (user_id) => {
    try {
      await axios.delete(`/api/users/${user_id}`);
      console.log("Kullanıcı silme işlemi başarılı");
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== user_id)
      );
    } catch (error) {
      console.error("Kişi silinirken hata oluştu:", error);
    }
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const canReadUsers = permissions.userAccountRead;
  const canCreateUser = permissions.userAccountCreate;
  const canUpdateUser = permissions.userAccountUpdate;
  const canDeleteUser = permissions.userAccountDelete;

  return (
    <div>
      <div>
        <h2>Kullanıcı İzinleri</h2>
        <label>
          Kullanıcıları Görüntüle:
          <input
            type="checkbox"
            name="userAccountRead"
            checked={permissions.userAccountRead}
            onChange={handlePermissionChange}
          />
        </label>
        <label>
          Kullanıcı Ekle:
          <input
            type="checkbox"
            name="userAccountCreate"
            checked={permissions.userAccountCreate}
            onChange={handlePermissionChange}
          />
        </label>
        <label>
          Kullanıcı Düzenle:
          <input
            type="checkbox"
            name="userAccountUpdate"
            checked={permissions.userAccountUpdate}
            onChange={handlePermissionChange}
          />
        </label>
        <label>
          Kullanıcı Sil:
          <input
            type="checkbox"
            name="userAccountDelete"
            checked={permissions.userAccountDelete}
            onChange={handlePermissionChange}
          />
        </label>
      </div>
      <h1>Kullanıcılar Tablosu</h1>
      <Link to="/add">Kullanıcı Ekle</Link>
      <table>
        <thead>
          <tr>
            <th>Kullanıcı Id</th>
            <th>Email</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.email}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>
                {canUpdateUser && (
                  <button>
                    <Link to={`/edit/${user.user_id}`}>Düzenle</Link>
                  </button>
                )}
                {canDeleteUser && (
                  <button onClick={() => handleDeleteUser(user.user_id)}>
                    Sil
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
