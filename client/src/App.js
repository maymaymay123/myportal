
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
import Login from './components/Login'
import Register from "./components/Register"
import UserContext from './components/UserContext'
import axios from 'axios';
import ShowPost from './pages/ShowPost'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import ShowTodo from './pages/ShowTodo'
import AddTodo from './pages/AddTodo'
import EditTodo from './pages/EditTodo'

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
    // // Define variables
    // let x = -400;
    // let direction = 1;

    // // Function which moves "pic" element
    // function hor(val) {
    // // Move by specified value multiplied by direction
    // x += val * direction; 

    // if(x > 400){
    //     x = 400;
    // // Reverse direction
    //     direction = -1;
    // } else if(x < -400){
    //     x = -400;
    // // Reverse direction, once again
    //     direction = 1;
    // }
    // // Move element
    //document.getElementById("pic").style.left = x + "px";

    // Continue loop
    // setTimeout("hor("+val+")", 10);
    // }

    // hor(3);

    // let myAudio = document.querySelector("#music");
    // let isPlaying = false;
    //music on off

    // function togglePlay() {
    //     let isPlaying ? myAudio.pause() : myAudio.play();
    // };

    // myAudio.onplaying = function() {
    //     let isPlaying = true;
    // };
    // myAudio.onpause = function() {
    //     let isPlaying = false;
    // };

    return (
        
        <div className="App"> 
            <div style={{ backgroundImage: `url(${background})`, height: "710px",backgroundSize: "cover"}}>
                <h1>Welcome to the NomadDo</h1>
                <h2>How are you today?</h2>
                <img id="pic" src="./flintstone.png" />
                <UserContext.Provider value={{username, setUsername, email, setEmail}}>
                    {username ? <Link to="/dashboard"></Link>:<Link to="/"></Link>}
                    <main>
                        <Switch>
                            <Route exact path='/'>
                                <Login />
                            </Route>
                            <Route exact path='/home'>
                                <Login />
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

                            <Route path="/todo/show/:id">
                                <ShowTodo username={username} email={email}/>
                            </Route>
                            <Route path="/todo/add">
                                <AddTodo username={username} email={email}/>
                            </Route>
                            <Route path="/todo/edit/:id">
                                <EditTodo username={username} email={email}/>
                            </Route>


                            <Route exact path={'/login'} component={Login} />
                            <Route exact path={'/register'} component={Register} />
                            <Route exact path={'/logout'} component={Logout} />
                        </Switch>           
                    </main>
                </UserContext.Provider>
            </div>
        </div>
    );
}

export default App;

//<a id="musicBox" onClick="togglePlay()">Music</a>
