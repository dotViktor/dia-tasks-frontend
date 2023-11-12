import React from "react";
import {Link} from "react-router-dom";
export default function Header(){

    const MENU_ITEMS = [
        {link:"/usersManager", title:"ManagerUsers"},
        {link:"/tasksManager", title:"ManagerTasks"},
        {link:"/createEditAddManager", title:"ManagerCreateEditAdd"}
    ]

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <div className="collapse navbar-collapse position-sticky" id="navbarNav">
                    <ul className="nav flex-row">
                        <li className="nav-item">
                            {
                                MENU_ITEMS.map((i, index) =>
                                    <Link key={index} className="nav-link text-black"
                                        to={i.link}>{i.title}
                                    </Link>)}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )

}