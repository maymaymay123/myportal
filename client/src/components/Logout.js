import React, {useState} from 'react'
import axios from 'axios';
import {NavLink} from "react-router-dom"

const Logout = (props) => {
    const [email, setEmail] = useState(props.email)
    const [username, setUsername] = useState(props.username)

    function handleLogout(e){
        axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
            .then(()=>setEmail(""))
            .then(()=>setUsername(""))
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
