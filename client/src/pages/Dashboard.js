import React from 'react'
import Navigation from '../components/Navigation'
import UserContext from '../components/UserContext';
import axios from 'axios';
import Login from "../components/Login"


const Dashboard = (props) => {
    const email = props.email;
    const username = props.username;
    const setEmail = props.setEmail;
    const setUsername = props.setUsername;

    // function handleLogout(e){
    //     axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
    //         .then(()=>setEmail(""))
    //         .then(()=>setUsername(""))
    //         window.location.href = "/login"
        
    // }
    return (
        <UserContext.Provider value={{username, setUsername, email, setEmail}}>
                {email ? <div><Navigation /> 
            
            <img id="pic" src="./flintstone.png" /></div> :<Login/>}

        </UserContext.Provider>
    )
}

export default Dashboard
