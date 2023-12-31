import React, { useState, useEffect } from "react";
import "../managerComponents/AdminScreen.css";
import axios from "axios";
import Navbar from "../managerPage/componentsForAll/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";
import { axiosOutHeaders } from "../..";
import Particles from "../reusables/Particles/Particles";

function RenderEventContent({ eventInfo, navigate }) {
  const redirectHandler = () => {
    return navigate(
      `/createAddEditTasks?id=${eventInfo.event.extendedProps.id}`
    );
  };
  return (
    <div
      className="admin-task-container"
      onClick={redirectHandler}
      onKeyDown={redirectHandler}
    >
      <Particles />
      <h1>{eventInfo.event.title}</h1>
      {eventInfo.event.extendedProps.users.map((user) => {
        return (
          <div className="admin-user-container" key={user.id}>
            <h1>{user.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminScreen() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks", axiosOutHeaders)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="main-admin-container">
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
          eventContent={(eventInfo) =>
            RenderEventContent({ eventInfo, navigate })
          }
          height={"85vh"}
          allDaySlot={false}
        />
      </div>
    </>
  );
}
