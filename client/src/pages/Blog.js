import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login'

const Blog = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
    const email = props.email;

    useEffect(()=>{
        console.log("hello")
        console.log("email",props.email)
        getData();
    },[props])

    function getData (){
   
        axios.get((uri + `blog/${props.email}`))
        .then(response =>{
            console.log('received data from blog server');
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

    if (email){
    return (
        <div style={{ backgroundColor:"#FEF3C7", height: "auto",backgroundSize: "cover", backgroundRepeat:"repeat-x"}}>   
            <div className="" >
                <div style={{textAlign:"center",fontSize:"20px"}}>
                    <button ><Link className="" to="/blog/add">Add New Post</Link></button>
                </div>
                <br/>
                    {data.map((element, index) => {
                        let currentDate = new Date(element.date);
                        const isoDate = currentDate.toISOString().split("T")[0];
                        return (
                            <div key={element._id} style={{textAlign:"center", backgroundColor: "#FFFBEB", width:"1300px",marginLeft:"130px", height:"auto"}} >
                                <h1 className="titledeco" style={{textDecoration:"none", color:"black"}}><Link to={`blog/show/${element._id}`}>{element.title}</Link></h1>
                                <div style={{color:"grey"}}><i>{isoDate}</i></div>
                                <div className="" >
                                    {element.img ? <img src={element.img} max-width="500px" height="300px" className=""/> : <img style={{visibility:"hidden"}}/>}
                                </div>
                                <p style={{fontSize:"20px"}}>{element.post}</p>
                                <button><Link to={`blog/edit/${element._id}`}><i className="" id={element._id}>Edit</i></Link></button>
                                <button><i className="" href="/blog" id={element._id} onClick={handleDelete}>Delete</i></button>
                                <br/>
                                <hr />
                            </div>
                        )
                    })}
                    <br/>
            </div>
        </div>
    )} else {
        return (<Login />)
    }
}

export default Blog

//<div><Link to={`/show/${element._id}`}>{element.item}</Link></div>
