import React, { useState, useEffect } from "react";
import "../managerComponents/AdminScreen.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../managerPage/componentsForAll/Navbar";

export default function AdminScreen() {

    const [tasksData, setTasksData] = useState([]);

    // useEffect(()=> {
    //     axios.get('...here a input the addres for the tasks',{
    //         params:{
    //             Id:12313
    //         }
    //     })
    //     .then(function(response){
    //         console.log(response);
    //     })
    // },[])

    return (
        <>
            <Navbar path="/navManager" element={<Navbar/>}/>
            
            <div className="main-admin-container">
                <div className="inner-admin-container">
                    <div className="date-box">
                        <time datatime="20.08.23">20.08.23
                        </time>
                    </div>
                    <div className="t-box task1">
                        <Link className="task-link" to="/createAddEditTasks">
                            <label>Task 1:</label>
                            <p>Here is one of the Tasks that have to be done until the next week!</p>
                            <span>Petko Petrov</span>
                        </Link>
                    </div>
                    <div className="t-box task2">
                        <Link className="task-link" to="/createAddEditTasks">
                            <label>Task 2:</label>
                            <p>Here is one of the Tasks that have to be done until the next week!</p>
                            <span>Sasho Petrov</span>
                        </Link>
                    </div>
                    <div className="t-box task3">
                        <Link className="task-link" to="/createAddEditTasks">
                            <label>Task 3:</label>
                            <p>Here is one of the Tasks that have to be done until the next week!</p>
                            <span>Mitko Petrov</span>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}