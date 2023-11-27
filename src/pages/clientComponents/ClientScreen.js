import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientScreen.css";
import NavbarClients from "../clientPage/navbarClientsFolder/NavbarClients.js";
import UserWelcome from "../loginPage/UserWelcome.js";
import { jwtDecode } from "jwt-decode";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function RenderEventContent({ eventInfo }) {
  return (
    <div className="client-task-container">
      <h1>{eventInfo.event.title}</h1>
      {eventInfo.event.extendedProps.users.map((user) => {
        return (
          <div className="client-user-container" key={user.id}>
            <h1>{user.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

const ClientScreen = () => {
  const [tasks, setTasks] = useState([]);

  const storedToken = localStorage.getItem("userToken");
  const loggedUser = jwtDecode(storedToken).user;

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks")
      .then((response) => {
        const tasks = response.data;
        const filteredTasks = tasks.filter((task) => {
          return task.users.some((user) => user.id === loggedUser.id);
        });
        setTasks(filteredTasks);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavbarClients path="/navClients"></NavbarClients>
      {<UserWelcome />}

      <div className="main-client-container">
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
              users: task.users,
            },
          }))}
          eventContent={(eventInfo) => RenderEventContent({ eventInfo })}
        />
      </div>
    </>
  );
};
export default ClientScreen;
