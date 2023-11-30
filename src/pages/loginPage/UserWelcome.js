import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./UserWelcome.css";
const UserWelcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserName(decodedToken.user.name);
    }
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-user">
        {userName ? (
          <div className="user-box">
            <i className="fa-solid fa-user"></i>
            <p className="user-name">{userName}</p>
          </div>
        ) : (
          <p>Welcome, Guest!</p>
        )}
      </div>
    </div>
  );
};

export default UserWelcome;
