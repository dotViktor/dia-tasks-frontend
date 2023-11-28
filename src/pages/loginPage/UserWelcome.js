import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import "./UserWelcome.css";
const UserWelcome = () => {
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState(getDate());


  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedToken = localStorage.getItem('userToken');

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserName(decodedToken.user.name);
    }
  }, []);

  return (
    <div className='welcome-container'>
      <div className='welcome-user'>
        {userName ? (
          <>
            <i class="fa-solid fa-user"></i>
            <p className='user-name'>{userName}</p>
          </>
        ) : (
          <p>Welcome, Guest!</p>
        )}
      </div>
      <div className='date-container'>
        <time className='current-date'>{currentDate}</time>
      </div>
    </div>
  );
};

export default UserWelcome;