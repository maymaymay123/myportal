import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => {

    const [todo, setTodo] = useState();
    const [completed, setCompleted] = useState();
    const [priority, setPriority] = useState('Low');
    const [prompt, setPrompt] = useState('');
    const [data,setData] = useState([])
    //const {id} = useParams();
    const email = props.email;
    const [buttonstate, setButtonstate] = useState('create')
    const [id, setId] = useState()

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
            completed,
            priority,
            email
        };
        if (!(todo && completed && priority)){
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
            setCompleted('');
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

    function clickTitle (element){
        console.log("element",element)
        setButtonstate('edit')
        setTodo(element.todo)
        setCompleted(element.completed = false)
        setPriority(element.priority)
        setId(element._id)
    }



    function handleEdit(e) {
        e.preventDefault();
        console.log("luludesc",completed)
        console.log('luluid',id)
        const data = {
            todo,
            completed,
            priority,
        }
        if (!(todo && completed && priority)){
            setPrompt(
                <alert onClose={() => setPrompt(false)}>
                    Please enter all fields!
                </alert>
                )
        } 
        console.log("lulu2")
        console.log('part1',uri + `todo/edit/${id}`)
        console.log('id',id)
        console.log('email',email)
        console.log('part2',data)
        axios.put((uri + `todo/edit/${id}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log(response.data);
            console.log("edited data",data);
            setTodo('')
            setCompleted('')
            setPriority('')
            window.location.href = "/todo";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    if (email){
    if (buttonstate==='create'){
    return (
        <div className="center" style={{textAlign:"center", backgroundColor: "white", width:"1600px", height:"900px"}}>
        <div className="" >
            <h5>You have <span className="">{data.length}</span> todo(s)!</h5>
        </div>
        {prompt}
            <form onSubmit={handleSubmit} >
            <div className="">    
                <label for="inputtodo">Todo: </label>
                <input className="" id="inputtodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo"/>
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
                } 
                let decoration;
                if (element.completed === true){
                    decoration = "line-through"
                }
                return (
                        <div id={element._id}>
                            <div scope="row">{index + 1}</div>
                            <div style={{backgroundColor: color, textDecoration:decoration, overflow:"auto"}} onClick={()=> clickTitle(element)}>{element.todo}</div>
                            <div> Priority: {element.priority}</div>
                            <div><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></div>
                            <br/>
                        </div>
                )

            })}

        </div>
        )
    }
    else if (buttonstate==='edit'){
        return (
            <div className="center" style={{textAlign:"center", backgroundColor: "white", width:"1600px", height:"900px"}}>
            <div className="" >
                <h5>You have <span className="">{data.length}</span> todo(s)!</h5>
            </div>
            {prompt}
                <form >
                <div className="">    
                    <label for="changetodo">Todo: </label>
                    <input className="" id="changetodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo"/>
                </div>
                <div className="">    
                    <label for="changecompleted">Completed? </label>  
                    <input className="" id="changecompleted" onChange={(e)=> setCompleted(true)} value={completed} type="checkbox" />
                </div> 

                <div className=""> 
                    <label for="changeSelect">Priority: </label>   
                    <select className="" id="changeSelect" onChange={(e)=> setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <br />
                <button className="" onClick={handleEdit}>Edit Todo</button>
                <button onClick={handleSubmit}>Add Todo</button>
                </form>
    
                <hr/>
                {data.map((element, index) => {
                    let color;
                    let priority;
                    if (element.priority === 'High'){
                        color = "red"; 
                    } else if (element.priority === "Medium") {
                        color = "yellow"
                    } 
                    let decoration;
                    if (element.completed === true){
                        decoration = "line-through"
                    }
                    return (
                            <div id={element._id}>
                                <div scope="row">{index + 1}</div>
                                <div style={{backgroundColor: color, textDecoration:decoration}} onClick={()=> clickTitle(element)}>{element.todo}</div>
                                <div> Priority: {element.priority}</div>
                                <div><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></div>
                                <br/>
                            </div>
                    )
    
                })}
    
            </div>
            )
    }} else {
        return (<button style={{marginLeft:"700px"}}><Link to="/login">Please Log in</Link></button>)
    }
}

export default Todo

//<div><Link to={`todo/edit/${element._id}`}><i className="" id={element._id}>Edit</i></Link></div>