import React,{useState,useEffect} from 'react';
import {useNavigate, Link, Routes, Route} from 'react-router-dom';
import axios from "axios";
import TaskDescription from '../clientPage/taskComponents/TaskDescription.js';
import ClientSingleTask from '../clientComponents/ClientSingleTasks.js';
import ClientTask from '../clientPage/taskComponents/TaskDescription.js';
import './ClientScreen.css';

const ClientScreen = () => {

    const [tasks,setTasks] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
        axios
        .get("http://localhost:7777/tasks")
        .then((response) => setTasks(response.data))
        .catch((error) => console.error(error));
    },[])

    const handleTaskClick = (taskId) => {
        navigate(`tasks/${taskId}`);
    }

    return(
        <div className='main-client-container'>
            <div className='inner-client-container'>
                {tasks.map((task) => (
                    <div key={task.id} className='task-container' onClick={() => handleTaskClick(task.id)}>
                        <ClientSingleTask key={task.id} task={task}/>
                    </div>
                ))}
            </div>

            <Routes>
                <Route path="/clientTask/:taskId" element={<ClientTask/>}></Route>
            </Routes>
        </div>
    )
}
export default ClientScreen;


// const ClientScreen = () =>  {
//     // const [succcess ,setSuccess] = useState()
//     // const navigate = useNavigate()

//     // axios.defaults.withCredentials = true;
//     // useEffect(()=> {
//     //     axios.get('http://localhost:3001/client')
//     //     .then(response => {
//     //         if(response.data === "Success"){
//     //             setSuccess("Succesed fine!")
//     //         }
//     //         else{
//     //             navigate('/login')
//     //         }
//     //     })
//     //     .catch(error => console.log(error))
//     // },[])

    
//     const [tasks,setTasks] = useState([]);

//     useEffect(() => {
//         axios
//           .get("http://localhost:7777/tasks")
//         //   console.log(tasks)
//           .then(response => setTasks(response.data))
//           .catch((err) => console.error(err));
//           console.log(tasks);
//       }, []);

//     return(
//         <div>
//             <h2>Clients Tasks</h2>
//             {/* <p>{succcess}</p> */}
//             <div>
//                 {tasks && tasks.map((task) => {
//                     <ClientSingleTask key={task.id} task={task.task}/>
//                 })}
//             </div>
//         </div>
//     )
// }
// export default ClientScreen;
// export default function ClientScreen(){

//     const [tasks,setTasks] = useState([])
    
//     function fetchTasks(){
//         fetch("http://localhost:7777/tasks")
//         .then(response => response.json())
//         .then(response =>{
//             setTasks(response.tasks);
//             console.log(response);
//         })
//     }

//     useEffect(() =>{
//         fetchTasks()
//     },[])
    
//     return(
//         <div>
//             <ClientSingleTask tasks={tasks}/>
//         </div>
//     )
// }


// const ClientScreen = () => {
    
//     const [tasks,setTasks] = useState([]);
//     useEffect(() => {
//         const fetchTasks = async() => {
//             try {
//                 const response = await axios.get('http://localhost:7777/tasks');
//                 setTasks(response.data.tasks);
//             }
//             catch(error){
//                 console.error("Error fetching tasks:", error);
//             }
//         } ;
//         fetchTasks();
//     },[])

//     return(
//         <div className='client-tasks-container'>
//             <div className='inner-t-c-container'>
//                 <h2>Tasks</h2>
//                 <div>
//                     {tasks && tasks.map(task=>(
//                         <li className='task-content' key={task.id} >{task.title}</li>
//                     )
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ClientScreen;
