import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./TaskDescription.css";
import Navbar from "../../managerPage/componentsForAll/Navbar.js";
import { useLocation } from "react-router-dom";
import RenderSubtasks from "../taskComponents/RenderSubtasks.js";
import axios from "axios";
import { axiosOutHeaders } from "../../../index.js";

export default function TaskDescription() {
  const location = useLocation();
  const task = location.state;

  const [subtasks, setSubtasks] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:7777/tasks/${task.id}/subtasks`, axiosOutHeaders)
      .then((response) => {
        setSubtasks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    window.history.back();
  };
  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="main-client-container">
        <div className="task-content-container">
          <div className="task-header">
            <div>
              <h3 className="task-title">{task.title}</h3>
            </div>
            <div>
              <p className="task-description">{task.description}</p>
            </div>
          </div>

          <div className="task-content">
            {subtasks.map((subtask) => (
              <Link
                key={subtask.id}
                to={`/clientScreen/clientTask/${task.id}/${subtask.id}`}
                state={subtask}
                className="sub-link"
              >
                <RenderSubtasks subtask={subtask} />
              </Link>
            ))}
          </div>
          <div className="btn-sub-container">
            <div className="btn-container">
              <button
                type="submit"
                onClick={handleClick}
                className="login-btn"
                smooth="true"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
