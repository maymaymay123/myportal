import React, {useState, useEffect} from "react";
import axios from 'axios';
import Login from '../components/Login'

const Todo = (props) => {

    const [todo, setTodo] = useState();
    const [completed, setCompleted] = useState();
    const [priority, setPriority] = useState('Low');
    const [prompt, setPrompt] = useState('');
    const [data,setData] = useState([])
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
            console.log('ss',response)
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
        <div style={{backgroundColor:"#FEF3C7"}}>
        <div float="left">
            <span style={{backgroundColor:"#EF4444"}}> &nbsp; High &nbsp;</span>
            <span style={{backgroundColor:"#FBBF24"}}> &nbsp; Medium &nbsp; </span>
            <span style={{backgroundColor:"#10B981"}}> &nbsp; Low &nbsp;</span>
        </div>
        <div className="" style={{textAlign:"center"}} >
            <h5>You have {data.length} todo(s)!</h5>
        </div>
        {prompt}
            <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
            <div className="">    
                <label hmtlFor="inputtodo">Todo:&nbsp; </label>
                <input className="" id="inputtodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo" style={{width:"700px"}}/>
            </div>
            <div className=""> 
                <label htmlFor="floatingSelect">Priority:&nbsp; </label>   
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
                    color = "#EF4444"; 
                } else if (element.priority === "Medium") {
                    color = "#FBBF24"
                } else {
                    color ="#10B981"
                }
                let decoration;
                if (element.completed === true){
                    decoration = "line-through"
                }
                return (
                        <div className="" id={element._id} style={{backgroundColor:"#FFFBEB", textAlign:"center", width:"700px", marginLeft:"450px", height:"auto"}}>
                            <div scope="row">{index + 1}</div>
                            <div style={{backgroundColor: color, textDecoration:decoration}} onClick={()=> clickTitle(element)}>{element.todo}</div>
                            <br/>
                            <button><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></button>
                            <br/>
                            <br/>
                        </div>
                )

            })}
            <br/>
        </div>
        )
    }
    else if (buttonstate==='edit'){
        return (
            <div className="" style={{backgroundColor:"#FEF3C7"}}>
            <div float="left">
                <span style={{backgroundColor:"#EF4444"}}> &nbsp; High &nbsp;</span>
                <span style={{backgroundColor:"#FBBF24"}}> &nbsp; Medium &nbsp; </span>
                <span style={{backgroundColor:"#10B981"}}> &nbsp; Low &nbsp;</span>
            </div>
            <div className="" style={{textAlign:"center"}}>
                <h5>You have {data.length} todo(s)!</h5>
            </div>
            {prompt}
                <form style={{textAlign:"center"}}>
                <div className="">    
                    <label htmlFor="changetodo">Todo:&nbsp; </label>
                    <input className="" id="changetodo" onChange={(e)=> setTodo(e.target.value)} value={todo} type="text" placeholder="Todo" style={{width:"700px"}}/>
                </div>
                <div className="">    
                    <label htmlFor="changecompleted">Completed?&nbsp; </label>  
                    <input className="" id="changecompleted" onChange={(e)=> setCompleted(true)} value={completed} type="checkbox" />
                </div> 

                <div className=""> 
                    <label htmlFor="changeSelect">Priority:&nbsp; </label>   
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
                        color = "#EF4444"; 
                    } else if (element.priority === "Medium") {
                        color = "#FBBF24"
                    } else {
                        color ="#10B981"
                    }
                    let decoration;
                    if (element.completed === true){
                        decoration = "line-through"
                    }
                    return (
                            <div id={element._id} style={{backgroundColor:"#FFFBEB", textAlign:"center", width:"700px", marginLeft:"450px"}}>
                                <div scope="row">{index + 1}</div>
                                <span><div style={{backgroundColor: color, textDecoration:decoration}} onClick={()=> clickTitle(element)}>{element.todo}</div></span>
                                <br/>
                                <span><button><i className="" href="/todo" id={element._id} onClick={handleDelete}>Delete</i></button></span>
                                <br/>
                                <br/>
                            </div>
                    )
    
                })}
                <br/>
            </div>
            )
    }} else {
        return (<Login />)
    }
}

export default Todo
