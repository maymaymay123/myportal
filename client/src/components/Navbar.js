import React from 'react'
import "../styles.css"
import {Link, NavLink} from "react-router-dom"
import UserContext from './UserContext';
import { useState, useEffect } from "react"
import axios from 'axios';


const Navbar = (props) => {

    const email = props.email;
    const username = props.username;
    const setEmail = props.setEmail;
    const setUsername = props.setUsername;
    // const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")

    function handleLogout(e){
        axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
            .then(()=>setEmail(""))
            .then(()=>setUsername(""))
            document.getElementById('logout').style.visibility = "hidden";
            window.location.href = "/login"
        
    }

    return (
        <UserContext.Provider value={{username, setUsername, email, setEmail}}>
            <nav>
            <div>
                <div id="content-container" className="bubble bubble-bottom-left" contenteditable>
                    {email && (<div>Hi, <b>{username} </b></div>)}
                    <div>
                        <NavLink to={"/game"}>Game</NavLink>
                    </div> 
                    <div>
                        <NavLink to={"/todo"}>Todo</NavLink>
                    </div>
                    <div>
                        <NavLink to={"/blog"}>Blog</NavLink>
                    </div>
                    <div>
                        <NavLink to={"/translator"}>Translator</NavLink>
                    </div>
                    
                </div>
            </div>
            </nav>
        </UserContext.Provider>
    )
}

export default Navbar
