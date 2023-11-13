import React from "react";
import "../managerComponents/AdminScreen.css";
import { Link } from "react-router-dom";

export default function AdminScreen(){
    return(
        <div className="main-container">
            <div className="inner-container">
                <div>
                    <Link to="createAddEditTasks"/>
                    <label>Task 1:</label>
                    <p>Here is one of the Tasks that have to be done until the next week!</p>
                    <span>Sasho Petrov</span>
                </div>
            </div>
        </div>
    )
}