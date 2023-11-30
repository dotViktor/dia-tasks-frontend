import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link className="link-title" to="/adminScreen">
        <h1 className="title">
          Tasks.<span className="title-effect">Do</span>
        </h1>
      </Link>
      //!This is the hamburger menu
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
