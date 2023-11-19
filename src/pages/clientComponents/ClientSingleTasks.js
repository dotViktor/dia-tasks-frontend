import React from 'react'

function ClientSingleTasks({task}) {
    const initials = task.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return (
    <div >
        <div>
            <p>{initials}</p>
            <p>{task.title}</p>
            <p>{task.id}</p>
        </div>
    </div>
  )
}

export default ClientSingleTasks

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