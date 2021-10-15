import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditTodo = () => {

    const [todo, setTodo] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState('Low');
    const [prompt, setPrompt] = useState('');

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
 
    console.log(id);

    useEffect(()=>{
        getOne();
        console.log("hehe")
    },[])
    
    function getOne() {
        axios.get((uri + `todo/show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setTodo(response.data.todo);
            setDescription(response.data.description);
            setPriority(response.data.priority);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'edittodobad', msg: error.message})
        })
    }
    
    function handleEdit(e) {
        e.preventDefault();
        const data = {
            todo,
            description,
            priority,
        }
        if (!(todo && description && priority)){
            setPrompt(
                <alert onClose={() => setPrompt(false)}>
                    Please enter all fields!
                </alert>
                )
        } 
        axios.put((uri + `todo/edit/${id}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log(response.data);
            // setData(response.data);
            console.log("THIS",data);
            window.location.href = "/todo";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    console.log();

    return (
        <div className="" style={{textAlign:"center", backgroundColor: "white", width:"1570px", height:"1000px"}}>
            <form>
                <div className="">  
                    <label for="changetodo">Todo</label>  
                    <input className="" id="changetodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo"/>
                </div>
                <div className="">    
                    <label for="changedescription">Description</label>
                    <input className="" id="changedescription" onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder="Description"/>
                </div>
                <div className=""> 
                    <label for="changeSelect">Priority</label>   
                    <select className="" id="changeSelect" onChange={(e)=> setPriority(e.target.value)} value={priority}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>    
               </div>
                {prompt}
                <button className="" onClick={handleEdit}>Edit Todo</button>
            </form>
        </div>
    )
}

export default EditTodo
