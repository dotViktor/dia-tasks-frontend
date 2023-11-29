import React from "react";
import "../users/UsersManager.css";

const User = ({ user, onClick }) => {
  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="user-container" onClick={onClick}>
      <span className="user-image">{initials}</span>
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default User;
