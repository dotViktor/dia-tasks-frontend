// import React,{useState} from "react";
// import axios from 'axios';
// import "../loginPage/LoginPage.css";

// export default function LoginPage(){

//     const [enteredValue,setEnteredValue] = useState({
//         username: '',
//         password: ''
//     });
//     const handleInput = (event) => {
//         setEnteredValue({...enteredValue, [event.target.name]:event.target.value});
//     }
//     function handleSubmit(event){
//         event.preventDefault()
//         axios.post('...', {enteredValue})
//         .then(response => console.log(response))
//         .catch(err => console.log(err))
//     }

//     return(
//         <div className="main-login-container">
//             <div className="inner-login-container">
//                 <div className="login-title">
//                     <h1>Tasks.Do</h1>
//                 </div>
//                 <form className="form-login" onSubmit={handleSubmit}>
//                     <label>Username:</label>
//                     <input type="text" placeholder="Enter username..." onChange={handleInput} name="username"></input><br></br>
//                     <label>Password:</label>
//                     <input type="text" placeholder="Enter password..." onChange={handleInput} name="password"></input><br></br>
//                     <button className="btn btn-primary">Submit</button>
//                 </form>
//             </div>    
//         </div>
//     )
// }


import React,{useState} from "react";
import axios from 'axios';
import "../loginPage/LoginPage.css";

export default function LoginPage(){

    const [enteredValue, setEnteredValue] = useState({
        username: '',
        password: ''
    })

    const handleInput = (event) => {
        setEnteredValue({...enteredValue, [event.target.name]:event.target.value});
    }

    function handleSubmit(event){
        event.preventDefault()
        axios.post('...',{enteredValue})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    return(
        <div className="main-login-container">
            <div className="inner-login-container">
                <div className="login-title">
                    <h1>Tasks.Do</h1>
                </div>
                <form className="form-login" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input type="text" onChange={handleInput} placeholder="Enter username..." name="username"/><br></br>
                    <label>Password:</label>
                    <input type="text" onChange={handleInput} placeholder="Enter password..." name="password"/><br></br>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}