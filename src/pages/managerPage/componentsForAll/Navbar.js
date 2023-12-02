import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserImageComponent from "../../globalComponents/UserImageComponent";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState("");

  //*Gets user details from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken.user);
    }
  }, []);

  //*Checks if the logged in user is admin
  const isAdmin = user && user.role === "admin";

  //*This is the user component
  const User = ({ user }) => {
    return (
      <div>
        {user ? (
          <div className="user-component-navbar">
            <UserImageComponent user={user} isnavbar={true} />
            <p>{user.name}</p>
          </div>
        ) : (
          <>
            <p id="navbar-no-user-p">Welcome, Guest!</p>
            <button className="custom-button" onClick={handleLogOut}>
              <span></span>Log In
            </button>
          </>
        )}
      </div>
    );
  };

  //*Handles log out
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    return navigate("/login");
  };

  return (
    <nav>
      <User user={user} />
      {isAdmin ? (
        <Link className="link-title" to="/adminScreen">
          <h1 className="title">
            Tasks.<span className="title-effect">Do</span>
          </h1>
        </Link>
      ) : (
        <Link className="link-title" to="/clientScreen">
          <h1 className="title">
            Tasks.<span className="title-effect">Do</span>
          </h1>
        </Link>
      )}
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
      <div className="nav-links-space">
        {isAdmin && (
          <ul className={menuOpen ? "open" : ""}>
            <li className={isActive("/tasksManager") ? "active-nav-link" : ""}>
              <NavLink to="/tasksManager">Tasks</NavLink>
            </li>
            <li className={isActive("/usersManager") ? "active-nav-link" : ""}>
              <NavLink to="/usersManager">Users</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
