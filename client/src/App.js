
import './App.css';
import "./styles.css"
import background from "./background_image.gif"
import React,{ useState, useEffect } from "react"
import {Switch, Route, Link} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Blog from "./pages/Blog"
import Simonsays from "./pages/Simonsays"
import Todo from "./pages/Todo"
import Translator from './pages/Translator';
import Logout from "./components/Logout"
import Register from "./components/Register"
import UserContext from './components/UserContext'
import axios from 'axios';
import ShowPost from './pages/ShowPost'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Music from './components/Music'

function App() {

    const [username,setUsername] = useState("")
    const [email, setEmail] = useState("")


    useEffect(()=>{
        axios.get("http://localhost:5000/user", {withCredentials:true})
        .then(response =>{
            setUsername(response.data.username)
            setEmail(response.data.email)    
        })
    },[])

    return (
        
        <div className="" > 
            <div style={{ backgroundImage: `url(${background})`, height: "1010px",backgroundSize: "cover", backgroundRepeat:"repeat-x"}}>
                <Link to="/dashboard"><img src='/homeicon.png' width="50px" height="50px" float="left" style={{margin:"25px",marginLeft:"40px"}}/></Link>
                <Music />
                <span style={{position:"absolute", marginLeft:"450px", marginTop:"30px"}}><h1>Welcome to the myportal</h1></span>
                <span style={{fontSize:"20px", color:"white", position:"absolute",marginTop:"25px", marginLeft: "1250px"}}>
                    {email && (<div>Hi, <b>{username} </b></div>)}
                    {email && (<Logout />)}
                </span>
                <hr style={{border:"white solid 3px"}} />
                <br/>
                <UserContext.Provider value={{username, setUsername, email, setEmail}}>
                    <main>
                        <Switch>
                            <Route exact path='/'>
                                <Dashboard setEmail={setEmail} setUsername={setUsername} email={email} username={username}/>
                            </Route>
                            <Route exact path='/home'>
                                <Dashboard setEmail={setEmail} setUsername={setUsername} email={email} username={username} />
                            </Route>
                            <Route exact path='/dashboard'><Dashboard setEmail={setEmail} setUsername={setUsername} email={email} username={username}/> </Route>
                            <Route exact path='/game'><Simonsays setEmail={setEmail} setUsername={setUsername} email={email} username={username}/> </Route>
                            <Route exact path='/todo'><Todo setEmail={setEmail} setUsername={setUsername} email={email} username={username} /></Route>         
                            <Route exact path='/blog'><Blog setEmail={setEmail} setUsername={setUsername} email={email} username={username} /></Route>
                            <Route exact path='/translator'><Translator setEmail={setEmail} setUsername={setUsername} email={email} username={username} /></Route>
                            <Route path="/blog/show/:id">
                                <ShowPost/>
                            </Route>
                            <Route path="/blog/add">
                                <AddPost username={username} email={email}/>
                            </Route>
                            <Route path="/blog/edit/:id">
                                <EditPost username={username} email={email}/>
                            </Route>
                            <Route exact path='/login'>
                                <Dashboard setEmail={setEmail} setUsername={setUsername} email={email} username={username}/>
                            </Route>
                            <Route exact path={'/register'} component={Register} />
                            <Route exact path={'/logout'} />
                        </Switch>           
                    </main>
                </UserContext.Provider>
            </div>
        </div>
    );
}

export default App;

