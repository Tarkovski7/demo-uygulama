import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersPage from "./components/UsersPage";
import AddUserPage from "./components/AddUserPage";
import EditUserPage from "./components/EditUserPage";
import DeleteUserPage from "./components/DeleteUserPage";

const App = () => {
  return (
    <div>
      <h1>Demo Uygulama</h1>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/edit/:userId" element={<EditUserPage />} />
        <Route path="/delete/:userId" element={<DeleteUserPage />} />
      </Routes>
    </div>
  );
};

export default App;
