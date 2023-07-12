import React, { useState } from "react";
import axios from "axios";

const AddUserPage = () => {
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

  const [canCreateUser, setCanCreateUser] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canCreateUser) {
      console.log("Bu işlem için izniniz yok.");
      return;
    }

    try {
      await axios.post("/api/users", user);
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
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
            Can Create User:
            <input
              type="checkbox"
              checked={canCreateUser}
              onChange={(e) => setCanCreateUser(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;
