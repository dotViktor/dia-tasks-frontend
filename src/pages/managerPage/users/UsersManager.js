import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../componentsForAll/UsersInfo";
import "./UsersManager.css";

const UsersManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="user-list">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};
export default UsersManager;