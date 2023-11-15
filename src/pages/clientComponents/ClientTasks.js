import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import LoginPage from "../loginPage/LoginPageComponent";

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
        </div>
    )
}