import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowTodo = () => {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    useEffect(()=>{
        getOne();
    },[])
    
    function getOne (){
        axios.get((uri + `todo/show/${id}`))
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
        axios.delete((uri + `todo/delete/${id}`))
        .then(response => {
            console.log('deleted one item');
            window.location.href = ("/todo");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }


    return (
        <div className="container">
            <div className="">   
                <div className="">  
                    <div>
                        <h3>Todo: {data.todo}</h3>
                    </div> 
                    <div>    
                        <p>Description: {data.description}</p>
                    </div> 
                    <div>    
                        <p>Priority: {data.priority}</p>
                    </div>
                    <Link to={`/blog/edit/${data._id}`} className="" id={data._id}>Edit</Link>
                    <div><a className="" onClick={handleDelete} id={data._id}>Remove</a></div>
                </div>
            </div>

        </div>
    )
}

export default ShowTodo
