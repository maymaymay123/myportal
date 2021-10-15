import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowPost = () => {
    
    const {id} = useParams();
    const [date, setDate] = useState('')
    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log("id",id);

    useEffect(()=>{
        getOne();
    },[])
    
    function getOne (){
        axios.get((uri + `blog/show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            let currentDate = new Date(response.data.date);
    
            let isoDate = currentDate.toISOString().split("T")[0];
            console.log('isodate',isoDate)
            setDate(isoDate)
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
            window.location.href = ("/blog");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }


    return (
        <div className="">
            <div className="" style={{textAlign:"center", backgroundColor: "white", width:"1570px",height:"1000px"}}>
                <Link to="../blog">Blog Page</Link>
                <div>
                    <h3>{data.title}</h3>
                </div> 
                <div>    
                    <p>{date}</p>
                </div> 
                <div className="" >
                    {data.img ? <img src={data.img} width="400px" height="400px" className=""/> : <img src="https://via.placeholder.com/10x10.png?text=No+Image+Selected" style={{visibility:"hidden"}}/>}
                </div>     
                <div>
                    <h3>{data.post}</h3>
                </div> 
                <Link to={`/blog/edit/${data._id}`} className="" id={data._id}>Edit</Link>
                <a className="" onClick={handleDelete} id={data._id}>Remove</a>
                </div>

        </div>
    )
}

export default ShowPost
