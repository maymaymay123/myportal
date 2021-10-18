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
            <div className="" style={{textAlign:"center", backgroundColor: "#FEF3C7", width:"1590px",height:"1000px"}}>
                <br/>
                <div>
                    <button style={{float:"left", marginLeft:"30px",fontSize:"20px"}}><Link to="/blog">Go to Blog Page</Link></button>
                </div> 
                <br/>
                <br/>
                <div>
                    <h1 style={{textDecoration:"none", color:"black"}}>{data.title}</h1>
                </div> 
                <div>    
                    <p style={{color:"grey"}}><i>{date}</i></p>
                </div> 
                <div className="" >
                    {data.img ? <img src={data.img} width="500px" height="300px" className=""/> : <img src="https://via.placeholder.com/10x10.png?text=No+Image+Selected" style={{visibility:"hidden"}}/>}
                </div> 
                <br/>    
                <div>
                    <p>{data.post}</p>
                </div> 
                <button><Link to={`/blog/edit/${data._id}`} className="" id={data._id}>Edit</Link></button>
                <button><div className="" onClick={handleDelete} id={data._id}>Delete</div></button>
                </div>

        </div>
    )
}

export default ShowPost
