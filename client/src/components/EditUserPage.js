import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    secondary_email: "",
    gsm: "",
    firstname: "",
    lastname: "",
    locale: "tr",
    timezone: "Asia/Istanbul",
    status: "ACTIVE",
  });

  const [canUpdateUser, setCanUpdateUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canUpdateUser) {
      console.log("Bu işlem için izniniz yok.");
      return;
    }

    try {
      await axios.put(`/api/users/${userId}`, user);
      console.log("User updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Secondary Email:</label>
          <input
            type="email"
            name="secondary_email"
            value={user.secondary_email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>GSM:</label>
          <input
            type="text"
            name="gsm"
            value={user.gsm}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>
            Can Update User:
            <input
              type="checkbox"
              checked={canUpdateUser}
              onChange={(e) => setCanUpdateUser(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserPage;
