import axios from "axios";
import "../loginPage/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LoginRegistrationEffect from "../login&RegistrationEffect/LoginRegistrationEffect.js";
import { axiosOutHeaders } from "../../index.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  //-------------------------
  // this hook gives you access to history objects
  // and you have access to several functions to
  // navigate your page. It's all about navigation.
  //-------------------------

  // axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {

    event.preventDefault();
    axios
      .post(
        "http://localhost:7777/users/login",
        { email, password },
        axiosOutHeaders
      )
      .then((response) => {
        if (response.status === 202 || 200) {

          const userToken = response.data.token;
          const decodedToken = jwtDecode(userToken);

          // Store the user information in localStorage
          localStorage.setItem("userToken", userToken);
          localStorage.setItem("userName", decodedToken.user.name);
          console.log(decodedToken.user.name);

          decodedToken.user.role === "admin"
            ? navigate("/adminScreen")
            : navigate("/clientScreen");
        } else {
          console.log("Oops! Something went wrong!");
        }
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
                className="input-login"
                placeholder="Username..."
                required
              />
              <i className="bx bx-user"></i>
            </div>
            <br></br>
            <div className="input-field-login">
              <input
                type="password"
                name="password"
                placeholder="Password..."
                value={password}
                className="input-login"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <br></br>
          <div className="btn-container">

            <button type="submit" className="custom-button" smooth="true">
              <span></span>Login
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>
          </div>
        </form>
        <div className="link-container">
          <Link to="/register">
            <span className="sign-up">Sign Up</span>
          </Link>
        </div>
      </div>
      <LoginRegistrationEffect />
    </div>
  );
}
export default LoginPage;
