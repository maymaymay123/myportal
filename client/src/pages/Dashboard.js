import React from 'react'
import Navigation from '../components/Navigation'
import UserContext from '../components/UserContext';
import axios from 'axios';
import {Link, NavLink} from "react-router-dom"
import Logout from '../components/Logout'

const Dashboard = (props) => {
    const email = props.email;
    const username = props.username;
    const setEmail = props.setEmail;
    const setUsername = props.setUsername;

    function handleLogout(e){
        axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
            .then(()=>setEmail(""))
            .then(()=>setUsername(""))
            //document.getElementById('logout').style.visibility = "hidden";
            window.location.href = "/login"
        
    }
    return (
        <UserContext.Provider value={{username, setUsername, email, setEmail}}>
                <Navigation />
            
            <img id="pic" src="./flintstone.png" />

        </UserContext.Provider>
    )
}

export default Dashboard
