import React, { useState } from "react";
import axios from 'axios';

const AddTodo = (props) => {

    const [todo, setTodo] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState('Low');
    const [prompt, setPrompt] = useState('');
    const email = props.email;

    const uri = "http://localhost:5000/"

    
    function handleSubmit(e){
        e.preventDefault();
        const data = {
            todo,
            description,
            priority,
            email,
        };
        if (!(todo && description )){
            setPrompt(
                <alert onClose={() => setPrompt(false)} >
                    Please enter all fields!
                </alert>
                )
        } 
        axios.post((uri + "todo/add"),data)
        .then(response =>{
            console.log('posted', response);
            setTodo('');
            setDescription('');
            setPriority('Low');
            window.location.href = "/todo";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>                   
                    <div className="">    
                        <input className="" id="inputtodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo"/>
                        <label for="inputtodo">Todo: </label>
                    </div>
                    <div className="">    
                        <label for="inputdescription">Description: </label>
                        <input className="form-control w-70" id="inputdescription" onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder="Desscription"/>
                    </div>
                    <div className=""> 
                        <label for="floatingSelect">Priority: </label>   
                        <select className="form-select" id="floatingSelect" onChange={(e)=> setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                <br/>
                {prompt} 
                <button className="" onClick={handleSubmit} href="./todo" >Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
