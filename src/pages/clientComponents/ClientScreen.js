import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientScreen.css";
import NavbarClients from "../clientPage/navbarClientsFolder/NavbarClients.js";
import UserWelcome from "../loginPage/UserWelcome.js";
import { jwtDecode } from "jwt-decode";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";
import { axiosOutHeaders } from "../../index.js";

function RenderEventContent({ eventInfo, navigate }) {
  const handleNavigate = () => {
    //state should have the title, desc and id
    return navigate(
      `/clientScreen/clientTask/${eventInfo.event.extendedProps.id}`,
      {
        state: {
          id: eventInfo.event.extendedProps.id,
          title: eventInfo.event.title,
          description: eventInfo.event.extendedProps.description,
          isComplete: eventInfo.event.extendedProps.isComplete,
          users: eventInfo.event.extendedProps.users,
        },
      }
    );
  };
  return (
    <div
      className="client-task-container"
      onClick={handleNavigate}
      onKeyDown={handleNavigate}
    >
      <h1>{eventInfo.event.title}</h1>

      <div
        className="client-user-container"
        key={eventInfo.event.extendedProps.user.id}
      >
        <h1>{eventInfo.event.extendedProps.user.name}</h1>
      </div>
    </div>
  );
}

const ClientScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("userToken");
  let loggedUser = null;
  if (storedToken) {
    loggedUser = jwtDecode(storedToken).user;
  }

  const filterTasks = (tasks) => {
    return tasks.filter((task) => {
      return task.users.some((user) => user.id === loggedUser.id);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks", axiosOutHeaders)
      .then((response) => {
        if (!loggedUser) return console.error("No logged user");
        const filteredTasks = filterTasks(response.data);
        setTasks(filteredTasks);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavbarClients path="/navClients"></NavbarClients>
      <div className="main-client-container">
        <div>
          <FullCalendar
            timeZone="EET"
            plugins={[timeGridPlugin, dayGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={tasks.map((task) => ({
              title: task.title,
              start: task.startTime,
              end: task.endTime,
              extendedProps: {
                id: task.id,
                description: task.description,
                isComplete: task.isComplete,
                user: loggedUser,
              },
            }))}
            eventContent={(eventInfo) =>
              RenderEventContent({ eventInfo, navigate })
            }
          />
        </div>
      </div>
    </>
  );
};
export default ClientScreen;
