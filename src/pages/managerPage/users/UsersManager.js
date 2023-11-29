// UsersManager.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../componentsForAll/UsersInfo";
import "./UsersManager.css";
import Navbar from "../componentsForAll/Navbar";
import UsersForm from "../componentsForAll/UsersForm";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  //Refresh data when user list is updated
  const handleRefreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:7777/users?key=${refreshKey}")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, [refreshKey]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="user-list">
        <div className="user-list-managers">
          <h2>Managers</h2>
          {users
            .filter((user) => user.role === "admin")
            .map((adminUser) => (
              <User
                key={adminUser.id}
                user={adminUser}
                onClick={() => handleUserClick(adminUser.id)}
              />
            ))}
        </div>
        <div className="user-list-employees">
          <h2>Employees</h2>
          {users
            .filter((user) => user.role === "client")
            .map((clientUser) => (
              <User
                key={clientUser.id}
                user={clientUser}
                onClick={() => handleUserClick(clientUser.id)}
              />
            ))}
        </div>
      </div>
      {showForm && (
        <div className="modal-overlay">
          <UsersForm
            userId={selectedUserId}
            onClose={handleCloseForm}
            onRefreshData={handleRefreshData}
          />
        </div>
      )}
    </>
  );
};

export default UsersManager;
