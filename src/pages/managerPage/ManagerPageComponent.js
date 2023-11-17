import React from "react";
import "../managerPage/ManagerPageComponent.css";
import Navbar from "./componentsForAll/Navbar.js";
import { Routes, Route} from "react-router-dom";
import TaskManager from "./tasks/TasksManager.js";
import UsersManager from "./users/UsersManager.js";
import AdminScreen from "../managerComponents/AdminScreen.js";
import CreateAddEditTasks from "./createAddEditTasksPage/CreateAddEditTasks.js";



// const router = createBrowserRouter([
//     {
//         path: "/tasksManager",
//         element: <TaskManager />,
        // children: [
        //     {
        //         path: "contacts/:contactId",
        //         element: <Contact />,
        //     },
        // ],
    // },
    // {
    //     path: "/usersManager",
    //     element: <UsersManager/>,
    // },
    // {
    //     path: "/adminScreen",
    //     element: <AdminScreen/>,
    //     children : [
    //         {
    //             path:"createAddEditTasks/:createAddEditTasksId",
    //             element: <CreateAddEditTasks/>
    //         }
    //     ]
    // }


// ])

export default function ManagerPageComponent() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<AdminScreen/>}/>
                <Route path="/createAddEditTasks" element={<CreateAddEditTasks/>}/>
                <Route path="/tasksManager" element={<TaskManager/>}/>
                <Route path="/usersManager" element={<UsersManager/>}/>
           </Routes>
        </div>
    )
};
