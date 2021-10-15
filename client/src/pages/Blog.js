import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'
import styles from '../styles.css'

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
            console.log('check date',response.data[3])
            //response.data.date = response.data.date.toISOString().split("T")[0]
            response.data.reverse()
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
            <div className="" style={{textAlign:"center", backgroundColor: "white", width:"1600px"}}>
                <Link to="../blog">Blog Page</Link>
                <br/>
                <Link className="" to="/blog/add">Add Post</Link>

                    {data.map((element, index) => {
                        let currentDate = new Date(element.date);
                        const isoDate = currentDate.toISOString().split("T")[0];
                        return (
                            <div key={element._id} >
                                <h1 className="titledeco" style={{textDecoration:"none", color:"black"}}><Link to={`blog/show/${element._id}`}>{element.title}</Link></h1>
                                <div>{isoDate}</div>
                                <div className="" >
                                    {element.img ? <img src={element.img} max-width="600px" height="400px" className=""/> : <img style={{visibility:"hidden"}}/>}
                                </div>
                                <p style={{fontSize:"25px"}}>{element.post}</p>
                                <div><Link to={`blog/edit/${element._id}`}><i className="" id={element._id}>Edit</i></Link></div>
                                <div><i className="" href="/blog" id={element._id} onClick={handleDelete}>Delete</i></div>
                                <br/>
                                <hr />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Blog

//<div><Link to={`/show/${element._id}`}>{element.item}</Link></div>
