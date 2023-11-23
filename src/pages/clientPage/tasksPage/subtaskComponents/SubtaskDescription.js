import React from 'react'
import './SubtaskDescription.css';
import {useLocation} from 'react-router-dom';
import NavbarClients from '../../navbarClientsFolder/NavbarClients';

export default function SubtaskDescription() {

      const location = useLocation();
      const subtask = location.state;

  return (
    <>
      <NavbarClients path="/navClients" ></NavbarClients>
      <div className='main-client-container'>
        <div className='sub-content-container'>
          <div className='sub-header'>
            <h1>{subtask.title}</h1>
            <p className='sub-description'>{subtask.description}</p>
          </div>
          <div className='sub-content'>
            <div>
              <button className='btn btn-primary'>Upload</button>
            </div>
            <div>
              <button className='btn btn-primary'>Note</button>
            </div>
            <div>
              <button className='btn btn-success'>Done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
