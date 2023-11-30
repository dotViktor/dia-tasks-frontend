import React from "react";
import './NavbarClients.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavbarClients() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("userToken");
        return (
            navigate("/login")

        )
    }
    return (
        <div className="nav-clients">
            <div className="nav-client-inner">
                <Link className="link-client" to='/clientScreen'>
                    <h1 className="title-clients">
                        Tasks.<span className="title-effect">Do</span>
                    </h1>
                </Link>
            </div>
            <div className="log-out-btn-container">
                <button className="log-out-btn" onClick={handleLogOut}>
                    Log Out
                </button>
            </div>
        </div>
    )
}