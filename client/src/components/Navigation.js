import React from 'react'
import "../styles.css"
import {Link, NavLink} from "react-router-dom"
import UserContext from './UserContext';
import { useState, useEffect } from "react"
import axios from 'axios';


const Navigation = (props) => {

    const email = props.email;
    const username = props.username;
    const setEmail = props.setEmail;
    const setUsername = props.setUsername;

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
                        <span style={{display:"flex"}}>
                            <NavLink to={"/blog"}><img className="tohover" src="./blog.jpg" width="200px" height="200px" style={{marginRight:"10px"}}/></NavLink>
                            <NavLink to={"/game"}><img className="tohover" src="./simonsays.jpg" width="220px" height="200px" style={{marginLeft:"10px"}}/></NavLink>
                        </span>
                        <br />
                        <span style={{display:"flex"}}>
                            <NavLink to={"/translator"}><img className="tohover" src="./translate.jpg" width="200px" height="200px" style={{marginRight:"10px"}}/></NavLink>
                            <NavLink to={"/todo"}><img  className="tohover" src="./todo.jpg" width="220px" height="200px" style={{marginLeft:"10px"}}/></NavLink>
                        </span>
                    
                </div>
            </div>
            </nav>
        </UserContext.Provider>
    )
}

export default Navigation
