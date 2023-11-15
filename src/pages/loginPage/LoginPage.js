import React,{useState} from "react";
import axios from 'axios';
import "../loginPage/LoginPage.css";

export default function LoginPage(){

    const [enteredValue, setEnteredValue] = useState({
        username: '',
        password: ''
    })

    const handleInput = (event) => {
        setEnteredValue({...enteredValue, [event.target.name]:event.target.value});
    }

    function 

    return(
        <div className="main-login-container">
            <div className="inner-login-container">
                <form>
                    <label>Username:</label>
                    <input type="text" onChange={handleInput} placeholder="Enter username..." name="username"/>
                    <label>Password:</label>
                    <input type="text" onChange={handleInput} placeholder="Enter password..." name="password"/>
                </form>
            </div>
        </div>
    )
}