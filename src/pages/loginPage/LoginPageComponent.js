import axios from 'axios';
import "../loginPage/LoginPage.css";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



// const AuthContext = createContext();
// export default function LoginPage(){


//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [role, setRole] = useState('');
//     const [error, setError] = useState(null);
//     const {setIsLoggedIn} = useContext(AuthContext);

//     const handleLoggin = async () => {
//         try {
//             const response = await axios.post('...here is the addres for the backend login end point', {
//                 email,
//                 password
//             });

//             const { role } = response.data; //Backend returns me the role of the current user
//             setIsLoggedIn(true);
//             setRole(role);
//         }
//         catch (error) {
//             setError('Invalid username or password!');
//         }
//     };
//     return (
//         <div className="main-login-container">
//             <div className="inner-login-container">
//                 <div className="login-title">
//                     <h1>Tasks.Do</h1>
//                 </div>
//                 <form className="form-login">
//                     <label>Email:</label>
//                     <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email..." value={email} /><br></br>
//                     <label>Password:</label>
//                     <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." value={password} /><br></br>
//                     <button onClick={handleLoggin} className="btn btn-primary">Submit</button>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                 </form>
//             </div>
//         </div>
//     )
// };

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    //-------------------------
    // this hook gives you access to history objects 
    // and you have access to several functions to 
    // navigate your page. It's all about navigation.
    //-------------------------

    // axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7777/users/login', { email, password })
            .then(response => {
                if (response.data.Status === "Success") {
                    if (response.data.role === "admin") {
                        navigate('/manager')
                    }
                    else {
                        navigate('/client')
                    }
                }
            })
            .catch(err => console.log(err))
     }


    return (
        <div className='main-login-container'>
            <div className='inner-login-container'>
                <h1>Login Page</h1>
                <form className='form-login' onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <strong>
                            Email:
                        </strong>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter email...'
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br></br>
                    <label htmlFor="password">
                        <strong>
                            Password:
                        </strong>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <button type="submit" className='btn btn-primary'>Login</button>
                </form>
                <p>Don't have an account</p>
                <Link to="/register" >Sign Up
                </Link>
            </div>

        </div>
    );
};
export default LoginPage;