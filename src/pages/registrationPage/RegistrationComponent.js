import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../registrationPage/RegistrationComponent.css';
import LoginRegistrationEffect from "../login&RegistrationEffect/LoginRegistrationEffect";
import { axiosOutHeaders } from "../..";

export default function RegistrationPage() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7777/users/register', { email, password, name }, axiosOutHeaders)
            .then(response => {
                navigate('/login')
            })
            .catch(
                error => console.log(error)
            )
    }

    return (
        <div className="main-register-container">
            <div className="inner-register-container">
                <h1 className='register-title'>Task.<span className='title-effect'>Do</span></h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div >
                        <div className="input-field-register">
                            <input type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-register"
                                placeholder="Username..." required />
                            <i className="bx bx-user"></i>
                        </div>
                        <br></br>
                        <div className="input-field-register">
                            <input
                                type="text"
                                placeholder="Enter name..."
                                autoComplete="off"
                                name="name"
                                ref={nameRef}
                                className="input-register"
                                onChange={(e) => setName(e.target.value)} />
                            <i className="bx bx-user"></i>
                        </div>
                        <br></br>
                        <div className="input-field-register">
                            <input type="password"
                                name="password"
                                placeholder="Password..."
                                value={password}
                                className="input-register"
                                onChange={(e) => setPassword(e.target.value)} />
                            <i className="bx bx-user"></i>
                        </div>
                    </div>
                    <button type="submit" className="register-btn">Registrate</button>
                </form>
                <div className='log-in-container'>
                    <Link to="/login" >
                        <span className='log-in'>
                            Log In
                        </span>
                    </Link>
                </div>
            </div>
            <LoginRegistrationEffect />
        </div>
    )
}
