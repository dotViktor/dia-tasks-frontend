import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './TaskDescription.css';
import SubtaskDescription from '../tasksPage/subtaskComponents/SubtaskDescription'
import ClientScreen from '../../clientComponents/ClientScreen';

// export default function TaskDescription(){
//     const {taskId} = useParams();

//     return(
//         <div>
//             <ClientScreen taskId={taskId}/>
//         </div>
//     )
// }


export default function TaskDescription() {
  return (
    <>
        <div>
            <h3>Task 1:</h3>
            <p>TaskDescription</p>
            <div>
                <ul>
                    <li>
                        <Link to='/clientSubtask'>Subtask 1</Link>
                    </li>
                    <li>
                        <Link to='/clientSubtask'>Subtask 2</Link>
                    </li>
                    <li>
                        <Link to='/clientSubtask'>Subtask 3</Link>
                    </li>
                </ul>
            </div>
        </div>

       
    </>
  )
}
