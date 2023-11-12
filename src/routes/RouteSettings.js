import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TaskPageForClient from '../pages/clientPage/tasksPage/taskPage.js';
import SubtaskPageForClient from '../pages/clientPage/tasksPage/subtaskPage/SubtaskPage.js';
import TaskPageForManager from '../pages/managerPage/tasks/TasksManager.js';
import SubtaskPageForManager from '../pages/managerPage/createAddEditTasksPage/subtaskPage/SubtaskPage.js';
import CreateEditAddPageManager from '../pages/managerPage/createAddEditTasksPage/CreateAddEditTaks.js';
import UsersPageForManager from '../pages/managerPage/users/UsersManager.js';

export default function RouteSettings(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element = {<TaskPageForClient/>}/>
                <Route path="/" exact element = {<SubtaskPageForClient/>}/>
                <Route path="/tasksManager" exact element = {<TaskPageForManager/>}/>
                <Route path="/subtasksManager" exact element = {<SubtaskPageForManager/>}/>
                <Route path="/createEditAddManager" exact element = {<CreateEditAddPageManager/>}/>
                <Route path="/usersManager" exact element = {<UsersPageForManager/>}/>
            </Routes>
        </BrowserRouter>
    )
}