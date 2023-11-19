import React,{useState,useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import ClientTask from '../clientPage/taskComponents/TaskDescription.js';
import ClientSingleTask from '../clientComponents/ClientSingleTasks.js';

export default function ClientScreen ()  {
    const [succcess ,setSuccess] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get('http://localhost:3001/client')
        .then(response => {
            if(response.data === "Success"){
                setSuccess("Succesed fine!")
            }
            else{
                navigate('/login')
            }
        })
        .catch(error => console.log(error))
    },[])

    
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:7777/tasks")
          console.log(tasks)
        //   .then(response => setTasks(response.tasks))
        //   .catch((err) => console.error(err));
      }, []);

    return(
        <div>
            <h2>Clients Tasks</h2>
            <p>{succcess}</p>
            <div>
                {tasks.map((task) => {
                    <ClientSingleTask key={task.id} task={task}>{task.id}</ClientSingleTask>
                })}
            </div>
        </div>
    )
}

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