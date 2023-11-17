import React,{useEffect,useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios";

export default function ClientTasks(){

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

    return(
        <div>
            <h2>Clients Tasks</h2>
            <p>{succcess}</p>
            <Link to='/clientTask'>
                <ul>
                    <li>
                        Task 1
                    </li>
                    <li>
                        Task 1
                    </li>
                    <li>
                        Task 1
                    </li>
                </ul>
            </Link>
        </div>
    )
}