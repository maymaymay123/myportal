import React, { useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const AddPost = (props) => {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split("T")[0];
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [date, setDate] = useState(isoDate)
    
    const [img, setImg] = useState('')
    const [prompt, setPrompt] = useState('');
    const email = props.email;
    const uri = "http://localhost:5000/"

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

    function handleSubmit(e){
        e.preventDefault();
        const data = {
            title,
            post,
            date,
            img,
            email,
        };
        if (!(title && post)){
            setPrompt(
                <alert onClose={() => setPrompt(false)}>
                    Title and Post should not be empty!
                </alert>
                )
        } 

        axios.post((uri + "blog/add"),data)
        .then(response =>{
            console.log('posted', response);
            setTitle('');
            setPost('');
            setImg('')
            window.location.href = "/blog";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    return (
        <div className="" style={{textAlign:"center", backgroundColor: "#FEF3C7", width:"1590px", height:"auto" }}>
            <br/> 
            <button style={{float:"left", marginLeft:"30px",fontSize:"20px"}}><Link to="../blog">Back to Blog Page</Link></button>
            <br/>
            {prompt} 
            <form onSubmit={handleSubmit}>                   
                    <div className="">  
                        <br/>
                        <label hmtlFor="inputtitle">Title:&nbsp; </label>  
                        <input className="" id="inputtitle" onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder="Title" style={{width:"900px"}}/>
                    </div> 
                    <br/>
                    <div className="">  
                        <div><label htmlFor="inputpost">Post: </label></div>
                        <textarea className="" id="inputpost" onChange={(e)=> setPost(e.target.value)} value={post} cols="180" rows="10" placeholder="Post"/>
                    </div>
                    <div className="">  
                        Today's Date: {date}
                    </div>
                    <br/>
                    <button className="" onClick={handleSubmit} href="../blog" >Submit New Post</button>
                    <br/>
                    <br/>
                    <div className="" style={{marginLeft:"70px"}}>    
                        <input className="" id="fileUpload" onChange={handleImage} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                    </div>
                    {img ? <img src={img} className="" width="500px" height="300px"/> : <img className="" src="https://via.placeholder.com/10x10.png?text=No+Image+Selected" style={{visibility:"hidden"}}/>}
                <br/>
                <br/>
    
            </form>
        </div>
    )
}

export default AddPost
 