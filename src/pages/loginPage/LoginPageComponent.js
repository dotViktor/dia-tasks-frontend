import axios from 'axios';
import "../loginPage/LoginPage.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AdminScreen from '../managerComponents/AdminScreen.js';
import ClientScreen from '../clientComponents/ClientScreen.js';
import { jwtDecode } from "jwt-decode";



function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


 
    //-------------------------
    // this hook gives you access to history objects 
    // and you have access to several functions to 
    // navigate your page. It's all about navigation.
    //-------------------------

    // axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7777/users/login', { email, password })
            .then(response => {

                //---------------------------------------------------
                // console.log(response.data.user.role);
                //---------------------------------------------------

                if (response.status === 202 || 200) {
                    console.log("Congratulation you have access!");

                    const userToken = response.data.token;
                    const decodedToken = jwtDecode(userToken);
        
                    // Store the user information in localStorage
                    localStorage.setItem('userToken', userToken);
                    localStorage.setItem('userName', decodedToken.user.name);
                    console.log(decodedToken.user.name)

                    // const userName = response.data.user.name;
                    // localStorage.setItem('userName', userName);
                    // console.log(userName);

                    // console.log(jwtDecode(response.data.token));
                    // const token = response.data.token;
                    // const decoded = jwtDecode(token);
                    // localStorage.setItem(token.user);
                    // console.log(decoded);
                    // console.log(token.user);

                    if (decodedToken.user.role === "admin") {
                        navigate("/adminScreen");
                    }
                    else {
                        navigate('/clientScreen');
                    }
                } else {
                    console.log("Oops! Something went wrong!")
                }

            })
            .catch(error => console.log(error))
    }

    

    return (
        <div className='main-login-container'>
            <div className='inner-login-container'>
                <h1>Login Page</h1>
                
                <form className='form-login' onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <strong>
                            Email:
                        </strong>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter email...'
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="password">
                        <strong>
                            Password:
                        </strong>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        value={password}
                        className='input-pass'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <button type="submit" className='btn btn-primary'>Login</button>
                </form>
                <p>Don't have an account</p>
                <Link to="/register" >Sign Up
                </Link>
            </div>

        </div>
    );
};
export default LoginPage;


