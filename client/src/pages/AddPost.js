import React, { useState } from "react";
import axios from 'axios';

const AddPost = (props) => {

    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')
    const [date, setDate] = useState('')
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
        if (!(title && post && date)){
            setPrompt(
                <alert onClose={() => setPrompt(false)}>
                    Please enter all fields!
                </alert>
                )
        } 

        axios.post((uri + "blog/add"),data)
        .then(response =>{
            console.log('posted', response);
            setTitle('');
            setPost('');
            setDate('')
            setImg('')
            window.location.href = "/blog";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    return (
        <div className="">
            <form onSubmit={handleSubmit}>                   
                    <div className="">  
                        <label for="inputtitle">Title</label>  
                        <input className="" id="inputtitle" onChange={(e)=> setTitle(e.target.value)} value={title} type="text" placeholder="Title"/>
                        
                    </div> 
                    <div className="">  
                        <label for="inputpost">Post</label>  
                        <input className="" id="inputpost" onChange={(e)=> setPost(e.target.value)} value={post} type="textarea" placeholder="Post"/>
                    </div>
                    <div className="">  
                        <label for="inputdate">Date</label>
                        <input className="" id="inputdate" onChange={(e)=> setDate(e.target.value)} value={date} type="date" placeholder="Date"/>
                    </div>
                    <div className="">    
                        <input className="form-control" id="fileUpload" onChange={handleImage} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                    </div>
                    {img ? <img className="" src={img}/> : <img className="" src="https://via.placeholder.com/400x250.png?text=No+Image+Selected"/>}
                <br/>
                <br/>
                {prompt} 
                <button className="" onClick={handleSubmit} href="../blog" >Add Post</button>
            </form>
        </div>
    )
}

export default AddPost
