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
                        <span style={{display:"flex"}}>
                            <NavLink to={"/game"}><div className="tohover" style={{backgroundColor:"#FCA5A5", width:"200px", height:"200px"}}><div style={{padding:"80px 0"}}>Game</div></div></NavLink>
                            <NavLink to={"/todo"}><div className="tohover" style={{backgroundColor:"#BFDBFE", width:"200px", height:"200px", marginLeft:"20px"}}><div style={{padding:"80px 0"}}>Todo</div></div></NavLink>
                        </span>
                        <br />
                        <span style={{display:"flex"}}>
                            <NavLink to={"/blog"}><div className="tohover" style={{backgroundColor:"#BFDBFE", width:"200px", height:"200px"}}><div style={{padding:"80px 0"}}>Blog</div></div></NavLink>
                            <NavLink to={"/translator"}><div className="tohover" style={{backgroundColor:"#FCA5A5", width:"200px", height:"200px", marginLeft:"20px"}}><div style={{padding:"80px 0"}}>Translator</div></div></NavLink>
                        </span>
                    
                </div>
            </div>
            </nav>
        </UserContext.Provider>
    )
}

export default Navbar
