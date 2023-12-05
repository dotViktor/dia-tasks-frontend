import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import UserImageComponent from "../../globalComponents/UserImageComponent";
import { jwtDecode } from "jwt-decode";
import UserProfileComponent from "./UserProfileComponent";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  //*Handles form visibility
  const handleUserClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  //*Gets user details from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken.user);
    }
    setLoading(false);
  }, []);

  //*Checks if the logged in user is admin
  const isAdmin = user && user.role === "admin";

  //*This is the user component
  const User = ({ user, onClick }) => {
    //*Split users name to only show first and last name
    let firstName = "";
    let lastName = "";
    if (user && user.name) {
      const words = user.name.split(" ");
      firstName = words[0];
      lastName = words.length > 1 ? words[words.length - 1] : "";
    }

    return (
      <div className="user-component-navbar" onClick={onClick}>
        {user ? (
          <>
            <UserImageComponent user={user} isnavbar={true} />
            <p>
              {firstName} {lastName}
            </p>
          </>
        ) : (
          <p id="navbar-no-user-p">Welcome, Guest!</p>
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
    <>
      <nav>
        {loading ? (
          <p></p> //Waiting for user details to be fetched, before rendering
        ) : (
          <>
            <User user={user} onClick={() => handleUserClick(user.id)} />
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
              {user ? (
                <ul className={menuOpen ? "open" : ""}>
                  {isAdmin && (
                    <>
                      <li
                        className={
                          isActive("/tasksManager") ? "active-nav-link" : ""
                        }
                      >
                        <NavLink to="/tasksManager">Tasks</NavLink>
                      </li>
                      <li
                        className={
                          isActive("/usersManager") ? "active-nav-link" : ""
                        }
                      >
                        <NavLink to="/usersManager">Users</NavLink>
                      </li>
                    </>
                  )}
                  <li
                    className="hidden-li"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <NavLink>Profile</NavLink>
                  </li>
                  <li className="hidden-li" onClick={handleLogOut}>
                    <NavLink>Log Out</NavLink>
                  </li>
                </ul>
              ) : (
                <button className="custom-button" onClick={handleLogOut}>
                  <span></span>Log In
                </button>
              )}
            </div>
          </>
        )}
      </nav>
      {showForm && (
        <div className="modal-overlay">
          <UserProfileComponent user={user} onClose={handleCloseForm} />
        </div>
      )}
    </>
  );
}
