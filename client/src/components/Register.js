import {useState, useContext} from "react";
import axios from 'axios';
import UserContext from './UserContext'
import {Link} from "react-router-dom";
import Features from './Features'
import styles from '../styles.css'

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
        <div className="registerpage">
            <button style={{float:"right",marginRight:"30px"}}><Link to="/login">Already have an account?</Link></button>
            <div className="">
                <h4>Create New Account </h4>
            </div>
            <form action="" onSubmit={e=>{handleRegister(e)}}>
                {msg}
                <div className="registerpage">
                    <label for="regname">Username: &nbsp; </label>
                    <input className="" id="regname" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} style={{width:"300px",marginBottom:"5px",marginLeft:"26px"}}/>
                </div>
                <div className="">
                    <label for="regemail">Email Address: &nbsp;</label>
                    <input className="" id="regemail" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"300px",marginBottom:"5px"}}/>
                </div>
                <div className="">
                    <label for="regpassword">Password: &nbsp;</label>
                    <input className="" id="regpassword" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"300px",marginBottom:"5px",marginLeft:"31px"}}/>
                </div>
                <div className="">
                    <button className="" type="submit">Create Account</button>
                </div>
            </form> 
            <img id="pic" src="./flintstone.png" />
            <Features />
        </div>
    )
}

export default Register
