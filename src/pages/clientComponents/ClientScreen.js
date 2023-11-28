import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import ClientSingleTask from '../clientComponents/ClientSingleTasks.js';
import './ClientScreen.css';
import NavbarClients from '../clientPage/navbarClientsFolder/NavbarClients.js';
import UserWelcome from '../loginPage/UserWelcome.js';



const ClientScreen = () => {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:7777/tasks")
            .then((response) => setTasks(response.data))
            .catch((error) => console.error(error));
    }, [])


    return (
        <>
            <NavbarClients path="/navClients" >
            </NavbarClients>

            <div className='main-client-container'>
                {<UserWelcome />}
                <div className='inner-client-container'>
                    {tasks.map((task) => (
                        <Link
                            key={task.id}
                            to={`/clientScreen/clientTask/${task.id}`}
                            state={task}
                            className="custom-link"
                        >
                            <ClientSingleTask task={task} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ClientScreen;

