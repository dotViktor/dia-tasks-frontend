import axios from "axios";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const RouteProtector = ({ children, allowedRole }) => {
  const localToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  if (!localToken) {
    navigate("/", { replace: true });
  }

  axios
    .get("http://localhost:7777/verify-token", {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    })
    .then((response) => {
      const user = response.data.user;
      if (user.role !== allowedRole) {
        navigate("/", { replace: true });
      }
    })
    .catch((err) => {
      console.error(err);
      navigate("/", { replace: true });
    });

  return <Outlet />;
};

export default RouteProtector;
