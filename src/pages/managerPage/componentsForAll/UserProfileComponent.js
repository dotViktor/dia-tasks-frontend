import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import UserImageComponent from "../../globalComponents/UserImageComponent";
import { axiosOutHeaders } from "../../..";

const UserProfileComponent = ({ user, onClose }) => {
  //*User Component
  const User = ({ user }) => {
    return (
      <div className="user-profile-information-component" key={user.id}>
        <div>
          <UserImageComponent user={user} isuserprofile={true} />
        </div>
        <div>
          <strong>Full Name:</strong> {user.name}
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
      "Are certain you want to delete your account? Keep in mind that this action is irreversible!"
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

  //*Split users name to only show first and last name
  let firstName = "";
  let lastName = "";
  if (user && user.name) {
    const words = user.name.split(" ");
    firstName = words[0];
    lastName = words.length > 1 ? words[words.length - 1] : "";
  }

  return (
    <div className="user-form">
      {user && (
        <>
          <div className="user-profile-header">
            <h2>
              User Profile: <strong>{firstName}</strong>{" "}
              <strong>{lastName}</strong>
            </h2>
            <span className="material-symbols-outlined" onClick={onClose}>
              close
            </span>
          </div>
          <User user={user} />
          <div className="user-profile-buttons">
            {user.role === "admin" && (
              <>
                <button className="custom-button" onClick={handleDeleteUser}>
                  <span></span>Delete Account
                </button>
              </>
            )}
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
