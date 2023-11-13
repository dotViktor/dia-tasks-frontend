import React from "react";

const User = ({ user }) => {
  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="user-container">
      <span className="user-image">{initials}</span>
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>@{user.email}</p>
      </div>
    </div>
  );
};

export default User;
