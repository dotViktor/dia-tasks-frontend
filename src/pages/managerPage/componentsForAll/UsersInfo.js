import React from "react";
import classnames from "classnames";
import "../users/UsersManager.css";

const User = ({ user, onClick }) => {
  const initials = user.name
    .split(" ")
    .filter(
      (word, index) => index === 0 || index === user.name.split(" ").length - 1
    )
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  //Checks if the user has two letters in initial, and if so, makes the initials smaller
  const imageClasses = classnames("user-image", {
    "user-image-smaller-initials": initials.length === 2,
  });

  return (
    <div className="user-container" onClick={onClick}>
      <span className={imageClasses}>{initials}</span>
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default User;
