import {useState, useContext} from "react";
import axios from 'axios';
import UserContext from './UserContext'
import {Link} from "react-router-dom";
import Features from './Features'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const user = useContext(UserContext)

    function handleRegister(e){
        e.preventDefault();
        const data = {username,email,password};
        axios.post('http://localhost:5000/register',data,{withCredentials:true})
        .then(response =>{
            console.log("empty",response.data)
            
            if (response.data.errorMessage === "Please enter all required fields."){
                const msg = (
                    <div class="alert alert-danger" role="alert">
                        <strong>Please enter all required fields.</strong>
                    </div>
                    )
                setMsg(msg)
                return
            }
            if (response.data.errorMessage === "Existing user."){
                const msg = (
                    <div class="alert alert-danger" role="alert">
                        <strong>There is an existing user.</strong>
                    </div>
                    )
                setMsg(msg)
                return
            }

            user.setUsername(response.data.username)
            user.setEmail(response.data.email)
            setUsername('')
            setEmail('');
            setPassword('')
            window.location.href = "/dashboard"

        })
    }


    return (
        <div className="">
            <Link to="/login">Login</Link>
            <div className="">
                <h4>Create New Account </h4>
            </div>
            <form action="" onSubmit={e=>{handleRegister(e)}}>
                {msg}
                <div className="">
                    <label for="floatingName">Username</label>
                    <input className="" id="floatingName" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="">
                    <label for="floatingEmail">Email Address</label>
                    <input className="" id="floatingEmail" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="">
                    <label for="floatingPassword">Password</label>
                    <input className="" id="floatingPassword" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="">
                    <button className="" type="submit">Create Account</button>
                </div>
            </form> 
            <Features />
        </div>
    )
}

export default Register
