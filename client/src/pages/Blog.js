import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'

const Blog = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
    //const username = props.username;

    useEffect(()=>{
        console.log("hello")
        console.log("email",props.email)
        getData();
    },[props])

    function getData (){
   
        axios.get((uri + `blog/${props.email}`))
        .then(response =>{
            console.log('received data from get one');
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    
    function handleDelete (e) {
        axios.delete((uri + `blog/delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one post');
            console.log('data',data);
            window.location.href = ("/blog");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div>
            <Link to="../dashboard">Dashboard</Link>
            {props.email && (<div>Hi, <b>{props.username} </b></div>)}
            <Logout />
            <hr />
            <div className="center">
                <br/>
                <Link className="" to="/blog/add">Add Article</Link>
                    {data.map((element, index) => {
                        return (
                            <div key={element._id}>
                                <div><Link to={`blog/show/${element._id}`}>{element.title}</Link></div>
                                <div>{element.date}</div>
                                <div>{element.img}</div>
                                <div>{element.post}</div>
                                <div><Link to={`blog/edit/${element._id}`}><i className="" id={element._id}>Edit</i></Link></div>
                                <div><i className="" href="/blog" id={element._id} onClick={handleDelete}>Delete</i></div>
                                <br/>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Blog

//<div><Link to={`/show/${element._id}`}>{element.item}</Link></div>
