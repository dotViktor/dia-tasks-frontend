import React from "react";
import classnames from "classnames";
import "../users/UsersManager.css";
import "../../globalComponents/UserImageComponent";
import UserImageComponent from "../../globalComponents/UserImageComponent";

const User = ({ user, onClick }) => {
  return (
    <div className="user-container" onClick={onClick}>
      <UserImageComponent user={user} />
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default User;
