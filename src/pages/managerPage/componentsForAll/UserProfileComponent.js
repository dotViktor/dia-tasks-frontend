import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import UserImageComponent from "../../globalComponents/UserImageComponent";
import { axiosOutHeaders } from "../../..";

const UserProfileComponent = ({ user, onClose }) => {
  //*User Component
  const User = ({ user }) => {
    return (
      <div className="user-information-component" key={user.id}>
        <div>
          <UserImageComponent user={user} />
        </div>
        <div>
          <strong>Name:</strong> {user.name}
          <br />
          <strong>Email:</strong> {user.email}
          <br />
          <strong>Role:</strong> {user.role}
        </div>
      </div>
    );
  };

  //*Deleting user account
  const handleDeleteUser = () => {
    const confirmed = window.confirm(
      "Are absolutely sure you want to delete this user? Keep in mind that deleting him will also remove him from all tasks."
    );
    if (user && confirmed) {
      axios
        .delete(`http://localhost:7777/users/${user.id}`, axiosOutHeaders)
        .then(() => {
          console.log("User deleted");
          onClose();
        })
        .catch((error) => console.error("Delete user error:", error));
    }
  };

  //*Handles log out
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    return navigate("/login");
  };

  return (
    <div className="user-form">
      {user && (
        <>
          <h2>
            User Information: <strong>{user.name}</strong>
          </h2>
          <User user={user} />
          <div className="users-form-buttons">
            {user.role === "admin" && (
              <>
                <button className="custom-button" onClick={handleDeleteUser}>
                  <span></span>Delete Account
                </button>
              </>
            )}
            <button className="custom-button" onClick={onClose}>
              <span></span>Go Back
            </button>
            <button className="custom-button" onClick={handleLogOut}>
              <span></span>Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileComponent;
