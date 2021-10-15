import React, {useState} from 'react'
import UserContext from '../components/UserContext';
import axios from 'axios';
import {Link, NavLink} from "react-router-dom"
import styles from "../styles.css"

const Logout = (props) => {

    // const email = props.email;
    // const username = props.username;
    // const setEmail = props.setEmail;
    // const setUsername = props.setUsername;
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)

    function handleLogout(e){
        axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
            .then(()=>setEmail(""))
            .then(()=>setUsername(""))
            //document.getElementById('logout').style.visibility = "hidden";
            window.location.href = "/"
        
    }

    return (
        <div>
            <div className="logoutword">
                <NavLink to={"/logout"}><div onClick={()=> handleLogout()}><strong>Logout</strong></div></NavLink>
            </div>
        </div>
    )
}

export default Logout
