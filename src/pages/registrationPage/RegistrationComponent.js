import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../loginPage/LoginPage.css";
import LoginRegistrationEffect from "../login&RegistrationEffect/LoginRegistrationEffect";
import { axiosOutHeaders } from "../..";

export default function RegistrationPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:7777/users/register",
        { email, password, name },
        axiosOutHeaders
      )
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="main-container">
      <div className="inner-login-container">
        <h1 className="login-title">
          Task.<span className="title-effect">Do</span>
        </h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="input-fields-div-login">
            <div className="input-field-login">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-register"
                placeholder="Username..."
                required
              />
              <i className="bx bx-user"></i>
            </div>
            <br></br>
            <div className="input-field-login">
              <input
                type="text"
                placeholder="Enter name..."
                autoComplete="off"
                name="name"
                ref={nameRef}
                className="input-register"
                onChange={(e) => setName(e.target.value)}
              />
              <i className="bx bx-user"></i>
            </div>
            <br></br>
            <div className="input-field-register">
              <input
                type="password"
                name="password"
                placeholder="Password..."
                value={password}
                className="input-register"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <br></br>
          <button type="submit" className="custom-button">
            <span></span>Register
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </form>
        <div className="link-container">
          <Link to="/login">
            <span className="log-in">Log In</span>
          </Link>
        </div>
      </div>
      <LoginRegistrationEffect />
    </div>
  );
}
