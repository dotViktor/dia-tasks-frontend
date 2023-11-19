import axios from "axios";
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../registrationPage/RegistrationComponent.css';

export default function RegistrationPage(){
    const [email,setEmail] = useState()
    const [password ,setPassword] = useState()
    const [name,setName] = useState()
    // axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7777/users/register',{email,password,name})
        .then(response => {
            navigate('/login')
        })
        .catch(
            error => console.log(error)
        )
    }   

    return(
        <div className="main-register-container">
            <div className="inner-register-container">
                <h1>Registrate</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            <strong>Email:</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter email..."
                            autoComplete="off"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        /><br></br>
                         <label htmlFor="name">
                            <strong>Name:</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name..."
                            autoComplete="off"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        /><br></br>
                        <label htmlFor="password">
                            <strong>Password:</strong>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password..."
                            onChange={(e) => setPassword(e.target.value)}
                        /><br></br>
                    <button type="submit" className="btn btn-primary">Registrate</button>
                </form>
                <p>Already have an account!</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
