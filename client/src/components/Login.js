import React, {useState, useContext} from "react";
import axios from 'axios';
import {Link} from "react-router-dom"
import Features from './Features'

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
                    <div className="" role="alert">
                        <strong>Invalid Login</strong>
                    </div>
                )
                setMsg(msg)
                return
            }
            
            setUsername('')
            setEmail('');
            setPassword('')
            //document.getElementById('login').style.visibility = "hidden";
            window.location.href = "/dashboard"

        })
        .catch(()=> {
            return
        })
    }
    return (
        <div>
            <form id="login" action="" onSubmit={e=>handleLogin(e)} >
                {msg}
                <div className="">
                    <label for="floatingEmail">Email Address</label>
                    <input className="" id="floatingEmail" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    
                </div>
                <div className="">
                    <label for="">Password</label>
                    <input className="" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    
                </div>
                <div className="">
                    <button className="" type="submit">Log in</button>
                </div>
                <a href="./register" style={{backgroundColor:"white"}}>Create New Account</a>
            </form>
            <Features />
        </div>
    )
}

export default Login
