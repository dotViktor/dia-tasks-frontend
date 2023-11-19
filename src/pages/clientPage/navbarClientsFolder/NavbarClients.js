import React from "react";
import './NavbarClients.css';
import {Link} from 'react-router-dom';

export default function NavbarClients(){
    return(
        <div className="nav-clients">
            <div className="nav-client-inner">
                <Link className="link-client" to='/clientScreen'>
                    <h1 className="title-clients">
                        Tasks.DO
                    </h1>
                </Link>
            </div>
        </div>
    )
}