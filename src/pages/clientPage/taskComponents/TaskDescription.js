import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "./TaskDescription.css";
import NavbarClients from "../navbarClientsFolder/NavbarClients";
import RenderSubtasks from "../taskComponents/RenderSubtasks.js";
import axios from "axios";
import { axiosOutHeaders } from "../../../index.js";
import Snowfall from 'react-snowfall'
import MainBgEffect from "../../login&RegistrationEffect/MainBgEffect.js";

export default function TaskDescription() {
  const location = useLocation();
  const task = location.state;
  const navigate = useNavigate();

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
      <NavbarClients path="/navClients"></NavbarClients>
      <div className="main-container">
        <Snowfall></Snowfall>
        <div className="reusable-container">
         

          <div className="task-content-decoration-2">
          </div>

          <div className="task-header">
            <div>
              <h3 className="task-title title-effect">{task.title}</h3>
            </div>
            <div>
              <p className="task-description">{task.description}</p>
            </div>
          </div>

          <div className="task-content">

            {subtasks.map((subtask) => (
              <div className="subtask-container" key={subtask.id}>
                {subtask.isComplete == "1" ? (
                  <div className="sub-link"><RenderSubtasks subtask={subtask} /></div>
                ) : (
                  <Link
                    key={subtask.id}
                    to={`/clientScreen/clientTask/${task.id}/${subtask.id}`}
                    state={subtask}
                    className="sub-link">
                    <RenderSubtasks subtask={subtask} />
                  </Link>
                )}
              </div>

            ))}

            {/* {subtasks.map((subtask) =>
            (
              <div key={subtask.id}>
                {subtask.isComplete == "1" ? (
                  <div  className="sub-link"><RenderSubtasks subtask={subtask}/></div>
                ) : (<Link
                  key={subtask.id}
                  to={`/clientScreen/clientTask/${task.id}/${subtask.id}`}
                  state={subtask}
                  className="sub-link"
                >
                  <RenderSubtasks subtask={subtask} />
                </Link>)}
              </div>
            ))} */}
          </div>
          <div className="btn-sub-container">
            <button type="submit" className='login-btn' onClick={handleClick} smooth="true">Done
            </button>
          </div>
        </div>
      </div>
        <MainBgEffect/>
    </>
  );
}
