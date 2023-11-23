import React, { useState, useEffect } from "react";
import "../managerComponents/AdminScreen.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../managerPage/componentsForAll/Navbar";
import TaskElement from "../managerPage/componentsForAll/TaskElementAdminPanel";

export default function AdminScreen() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks")
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="main-admin-container">
        <div className="filter-box">
          <h3>20.08.23</h3>
        </div>
        <div className="grid-container">
          <div className="times-column">
            {Array.from({ length: 20 - 8 + 1 }, (_, index) => (
              <div key={index} className="hour-cell">
                {index + 8}:00
              </div>
            ))}
          </div>
          <div className="task-screen">
            {tasks.map((task) => (
              <div className="task-link-box">
                <Link key={task.id} to={`/createAddEditTasks?id=${task.id}`}>
                  <TaskElement task={task} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
