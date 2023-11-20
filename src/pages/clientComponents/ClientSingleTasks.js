import React from "react";
import './ClientScreen.css';


const ClientSingleTask = ({ task }) => {

  return (
    <div className="task-box">
        <h3>{task.title}</h3>
    </div>
  );
};
export default ClientSingleTask;


// import React from "react";

// const ClientSingleTask = ({tasks}) => {

//     const initials = tasks.title
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase())
//     .join("");

//     function renderTask(t){
//         return(
//             <div>
//                 <p>{initials}</p>
//                 <p>{t.title}</p>
//             </div>
//         )
//     }

//     return(
//         <div>
//             {tasks.map(renderTask)}
//         </div>
//     )
// }
// export default ClientSingleTask();

