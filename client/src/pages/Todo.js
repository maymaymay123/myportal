import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'

const Todo = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    useEffect(()=>{
        getData();
    },[props])
    
    function getData (){
        console.log("email",props.email)
        axios.get((uri + `todo/${props.email}`))
        .then(response =>{
            console.log('received data');
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    function handleDelete (e) {
        console.log("ddd",e.target.id)
        axios.delete((uri + `todo/delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one item');
            console.log('data',data);
            window.location.href = ("/todo");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div class="center">
            <Link to="/dashboard">Dashboard</Link>
            <div className="">
                
                {props.email && (<div>Hi, <b>{props.username} </b></div>)}
                <Logout />
                <h5>You have <span className="">{data.length}</span> todos!</h5>
            </div>
            <br/>
            <Link className="" to="/todo/add">Add Todo</Link>

                
                {data.map((element, index) => {
                    let color;
                    let priority;
                    console.log(priority);
                    if (priority === 'High'){
                        color = "pink"; 
                    } else if (priority === "Medium") {
                        color = "yellow"
                    } else {
                        color = "green"
                    }
                    return (
                            <div id={element._id}>
                                <div scope="row">{index + 1}</div>
                                <div><Link to={`todo/show/${element._id}`}>{element.todo}</Link></div>
                                <div style={{backgroundColor: color}}><Link to={`todo/show/${element._id}`}></Link></div>
                                <div>{element.description}</div>
                                <div><Link to={`todo/edit/${element._id}`}><i className="bi bi-pencil-square text-dark" id={element._id}>Edit</i></Link></div>
                                <div><i className="bi bi-trash text-dark" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></div>
                                <br/>
                            </div>
                    )
                })}
        </div>
    )
}

export default Todo
