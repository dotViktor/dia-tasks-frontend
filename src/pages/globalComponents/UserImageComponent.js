import React from "react";
import "./UserImageComponent.css";
import classnames from "classnames";

const UserImageComponent = ({ user }) => {
  //Gets the first letter of the first and last name of the user, and makes them uppercase
  const initials = user.name
    .split(" ")
    .filter(
      (word, index) => index === 0 || index === user.name.split(" ").length - 1
    )
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  //Checks if the user has two letters in initial, and if so, makes the initials smaller by adding a second class to the same div
  const imageClasses = classnames("user-image", {
    "user-image-smaller-initials": initials.length === 2,
  });

  return <span className={imageClasses}>{initials}</span>;
};

export default UserImageComponent;
