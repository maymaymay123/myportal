import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => {

    const [todo, setTodo] = useState();
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState('Low');
    const [prompt, setPrompt] = useState('');
    const [data,setData] = useState([])
    const {id} = useParams();
    const email = props.email;

    const uri = "http://localhost:5000/"

    useEffect(()=>{
        getData();
    },[props]) 
    
    function getData (){
        console.log("email",props.email)
        axios.get((uri + `todo/${props.email}`))
        .then(response =>{
            console.log('received data');
            setData(response.data)
            console.log("datatodo",data)

        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        const data = {
            todo,
            description,
            priority,
            email
        };
        if (!(todo && description && priority)){
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

    function handleDelete (e) {
        console.log("ddd",e.target.id)
        axios.delete((uri + `todo/delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one item');
            console.log('data',data);
            window.location.href = ("/todo");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }


    function handleEdit(e) {
        e.preventDefault();
        const data = {
            todo,
            description,
            priority,
        }
        if (!(todo && description )){
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

    return (
        <div className="center" style={{textAlign:"center", backgroundColor: "white", width:"1600px", height:"900px"}}>
        <div className="" >
            <h5>You have <span className="">{data.length}</span> todos!</h5>
        </div>
        {prompt}
            <form onSubmit={handleSubmit} >
            <div className="">    
                <label for="inputtodo">Todo: </label>
                <input className="" id="inputtodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo"/>
            </div>
            <div className="">    
                <label for="inputdescription">Description: </label>
                <input className="" id="inputdescription" onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder="Description"/>
            </div>
            <div className=""> 
                <label for="floatingSelect">Priority: </label>   
                <select className="" id="floatingSelect" onChange={(e)=> setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <br />
            <button className="" onClick={handleSubmit}>Add Todo</button>
            </form>

            <hr/>
            {data.map((element, index) => {
                let color;
                let priority;
                if (element.priority === 'High'){
                    color = "red"; 
                } else if (element.priority === "Medium") {
                    color = "yellow"
                } else {
                    color = "green"
                }
                return (
                        <div id={element._id}>
                            <div scope="row">{index + 1}</div>
                            <div style={{backgroundColor: color}}><Link to={`todo/show/${element._id}`}>{element.todo}</Link></div>
                            <div>{element.description}</div>
                            <div> Priority: {element.priority}</div>
                            <div><Link to={`todo/edit/${element._id}`}><i className="" id={element._id}>Edit</i></Link></div>
                            <div><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></div>
                            <br/>
                        </div>
                )

            })}

        </div>
    )
}

export default Todo

