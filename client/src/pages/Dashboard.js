import React from 'react'
import Navigation from '../components/Navigation'
import UserContext from '../components/UserContext';
import Login from "../components/Login"


const Dashboard = (props) => {
    const email = props.email;
    const username = props.username;
    const setEmail = props.setEmail;
    const setUsername = props.setUsername;

    return (
        <UserContext.Provider value={{username, setUsername, email, setEmail}}>
                {email ? <div><Navigation /> 
            
            <img id="pic" src="./flintstone.png" /></div> :<Login/>}

        </UserContext.Provider>
    )
}

export default Dashboard
