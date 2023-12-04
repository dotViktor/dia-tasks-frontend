import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RouteProtector = ({ children, allowedRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const localToken = localStorage.getItem("userToken");

  useEffect(() => {
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate("/", { replace: true });
      });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <Outlet />;
};

export default RouteProtector;
