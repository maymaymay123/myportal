import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo'

const Todo = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
    const [prompt, setPrompt] = useState('')
    const [todo, setTodo] = useState()
    const [description, setDescription] = useState()
    const [priority, setPriority] = useState('Low')
    const {id} = useParams();
    const email = props.email;

    useEffect(()=>{
        getData();
    },[props]) 
    
    function getData (){
        console.log("email",props.email)
        axios.get((uri + `todo/${props.email}`))
        .then(response =>{
            console.log('received data');
            setData(response.data)
            // setTodo(response.data.todo)
            // setDescription(response.data.description)
            // setPriority(response.data.priority)
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
        if (!(todo && description && priority)){
            setPrompt(
                <alert variant="danger" onClose={() => setPrompt(false)} dismissible>
                    Please enter all fields!
                </alert>
                )
        } 
        axios.put((uri + `edit/${id}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log(response.data);
            console.log("THIS",data);
            //window.location.href = "/todo;
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    
    return (
        <div class="center" style={{textAlign:"center", backgroundColor: "white", width:"1570px", height:"900px"}}>
            <div className="" >
                <h5>You have <span className="">{data.length}</span> todos!</h5>
            </div>

            <br/>
            {prompt}
                
                {data.map((element, index) => {
                    let color;
                    let priority;
                    console.log(element.priority);
                    if (priority === 'High'){
                        color = "pink"; 
                    } else if (element.priority === "Medium") {
                        color = "yellow"
                    } else {
                        color = "green"
                    }
                    return (
                            <div id={element._id}>
                                <div scope="row">{index + 1}</div>
                                <div style={{backgroundColor: color}}>{element.todo}</div>
                                <div>{element.description}</div>
                                <div> Priority: {element.priority}</div>
                                <div><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></div>
                                <br/>
                            </div>
                    )

                })}
        </div>
    )
}

export default Todo

//            <button onClick = {handleSubmit} className = "">Add Todo</button>
//<div><i className="" id={element._id} onClick={handleEdit}>Edit</i></div>