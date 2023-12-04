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
import Particles from "../reusables/Particles/Particles.jsx";

function RenderEventContent({ eventInfo, navigate }) {
  const taskStatus = () => {
    const currentDate = new Date();
    if (eventInfo.event.extendedProps.isComplete === true) {
      return "complete-task";
    }

    if (eventInfo.event.end < currentDate) {
      return "past-task";
    }

    if (
      eventInfo.event.start < currentDate &&
      eventInfo.event.end > currentDate
    ) {
      return "current-task";
    }

    return "upcoming-task";
  };

  const handleNavigate = () => {
    if (eventInfo.event.extendedProps.isComplete === true) return;
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
      className={`client-task-container ${taskStatus()}`}
      onClick={handleNavigate}
      onKeyDown={handleNavigate}
    >
      <Particles />
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
      <div className="main-client-screen-container">
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
          height={"85vh"}
          allDaySlot={false}
        />
      </div>
    </>
  );
};
export default ClientScreen;
