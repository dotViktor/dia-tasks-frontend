import React from "react";
import {Link} from 'react-router-dom';

export default function NavbarClients(){
    return(
        <div className="nav-clients">
            <div className="nav-client-inner">
                <Link to='/clientScreen'>
                    <h1 className="title-clients">
                        Tasks.DO
                    </h1>
                </Link>
            </div>
        </div>
    )
}