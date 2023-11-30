import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import UserImageComponent from "../../globalComponents/UserImageComponent";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  //*This is the user component
  const User = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
      // Retrieve user information from localStorage
      const storedToken = localStorage.getItem("userToken");

      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        setUser(decodedToken.user);
      }
    }, []);

    return (
      <div>
        {user ? (
          <div className="user-component-navbar">
            <UserImageComponent user={user} isnavbar={true} />
            <p>{user.name}</p>
          </div>
        ) : (
          <p id="navbar-no-user-p">You're not supposed to be here!</p>
        )}
      </div>
    );
  };

  return (
    <nav>
      <User />
      <Link className="link-title" to="/adminScreen">
        <h1 className="title">
          Tasks.<span className="title-effect">Do</span>
        </h1>
      </Link>
      {/* This is a hamburger menu */}
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/tasksManager">Tasks</NavLink>
        </li>
        <li>
          <NavLink to="/usersManager">Users</NavLink>
        </li>
      </ul>
    </nav>
  );
}
