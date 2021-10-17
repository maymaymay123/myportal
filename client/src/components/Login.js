import React, {useState, useContext} from "react";
import axios from 'axios';
import {Link} from "react-router-dom"
import Features from './Features'
import styles from '../styles.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    //sign new token with userinfo , send it with response
    function handleLogin(e){
        e.preventDefault();
        const data = {email,password};
        axios.post('http://localhost:5000/login',data,{withCredentials:true})
        .then(response =>{
            console.log('response login',response)
            if (response.data==='issue' || response.data==="err"){
                const msg = (
                    <div className="alert alert-danger">
                        <strong>Invalid Login</strong>
                    </div>
                )
                setMsg(msg)
                return
            }
            
            setUsername('')
            setEmail('');
            setPassword('')
            window.location.href = "/dashboard"

        })
        .catch(()=> {
            return
        })
    }
    return (
        <div className="loginpage">
            <form id="login" action="" onSubmit={e=>handleLogin(e)} >
                {msg}
                <div className="">
                    <label for="email">Email Address:&nbsp; </label>
                    <input className="" id="email" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width: "300px", marginBottom:"5px"}}/>
                    
                </div>
                <div className="">
                    <label for="password">Password:&nbsp; </label>
                    <input className="" id="password" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} style={{marginLeft:"32px", width:"300px", marginBottom:"5px"}}/>
                    
                </div>
                <div className="">
                    <button className="" type="submit">Log in</button>
                </div>
                <br />
                <a href="./register" style={{backgroundColor:"white"}}>Create New Account</a>
            </form>
            <img id="pic" src="./flintstone.png" />
            <Features />
        </div>
    )
}

export default Login
