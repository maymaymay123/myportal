import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowPost = () => {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    useEffect(()=>{
        getOne();
    },[])
    
    function getOne (){
        axios.get((uri + `blog/show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setData(response.data);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    function handleDelete (e) {
        axios.delete((uri + `blog/delete/${id}`))
        .then(response => {
            console.log('deleted one item');
            window.location.href = ("../blog");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }


    return (
        <div className="container">
            <div className="">
                <div>
                    <h3>{data.title}</h3>
                </div> 
                <div>    
                    <h6>{data.date}</h6>
                </div> 
                <div className="">
                    {data.img ? <img src={data.img} className=""/> : <img src="https://via.placeholder.com/200x250.png?text=No+Image+Selected"/>}
                </div>     
                <div>
                    <h3>{data.post}</h3>
                </div> 
                <Link to={`..blog/edit/${data._id}`} className="" id={data._id}>Edit</Link>
                <a className="btn btn-dark" onClick={handleDelete} id={data._id}>Remove</a>
                </div>

        </div>
    )
}

export default ShowPost
