import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const EditPost = (props) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split("T")[0];
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [img, setImg] = useState('')
    const [prompt, setPrompt] = useState('');
    const [date, setDate] = useState('')
 
    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImg(base64);
    };

    useEffect(()=>{
        getOne();
        console.log('useeffect')
    },[])
    
    function getOne() {
        axios.get((uri + `blog/show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setTitle(response.data.title);
            setPost(response.data.post);
            setImg(response.data.img);
            console.log("THIS",data);
            let currentDate = new Date(response.data.date);
            let isoDate = currentDate.toISOString().split("T")[0];
            setDate(isoDate)
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        }) 
    }
    
    function handleEdit(e) {
        e.preventDefault();
        const data = {
            title,
            post,
            date,
            img,
        }
        if (!(title && post)){
            setPrompt(
                <alert onClose={() => setPrompt(false)}>
                    Please enter all fields!
                </alert>
                )
        } 
        axios.put((uri + `blog/edit/${id}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log(response.data);
            console.log("THIS",data);
            window.location.href = "/blog";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    console.log();

    return (
        <div className="" style={{textAlign:"center", backgroundColor: "white", width:"1570px", height:"1000px"}}>
            <Link to="/blog">Blog Page</Link>
            <form>
                <div className="">  
                    <label for="changetitle">Title: </label>  
                    <input className="" id="changetitle" onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder="Title"/>
                    
                </div>
                <div className="">   
                    <div><label for="changepost">Post: </label></div>      
                    <textarea className="" id="changepost" onChange={(e)=> setPost(e.target.value)} value={post} cols="180" rows="10" placeholder="Post"/> 
               </div>
               <div>Date: {date}</div>
               <div className="">    
                    <input className="" id="fileUpload" onChange={handleImage} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                </div>
               <div>
               {img ? <img src={img} width="400px" height="400px" /> : <img src="https://via.placeholder.com/10x10.png?text=No+Image+Selected" style={{visibility:"hidden"}}/>}
               </div>
                {prompt}
                <button className="" onClick={handleEdit}>Update Post</button>
            </form>
        </div>
    )
}

export default EditPost
