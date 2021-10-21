import React, {useState, useEffect} from "react";
import axios from 'axios';
import Login from '../components/Login'


const Translator = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
    const [from, setFrom] = useState('en')
    const [to, setTo] = useState('af')
    const [text, setText] = useState('')
    const [translated, setTranslated] = useState('')
    const [prompt, setPrompt] = useState('')
    const email = props.email;
    let lasttranslated;
    


    useEffect(()=>{
        getData();
    },[props])

    function getData (){
   
        axios.get((uri + `translator/${props.email}`))
        .then(response =>{
            console.log('received translate data from server');
            response.data.reverse()
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad cannot get from server', msg: error.message})
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const data = {
            from,
            to,
            text,
            email
        };
        console.log("can reach here")
        if (!(text)){
            try{
            setPrompt(
                <div onClose={() => setPrompt(false)} >
                    Do you fill up all the fields?
                </div>
                )
            } catch (error) {
                console.log("not filling up correctly", error)
            }
        } 
        console.log("can reach here too")
        axios.post((uri + "translator/"),data)
        .then(response =>{
            console.log('posted data',data)
            setText('');
            setTranslated('')
            setPrompt('')
            getResult()
        })
        .catch((error)=> {
            console.log({status: 'bad translator frontend', msg: error.message})
        })

    }



    function getResult(){
        axios.get((uri + `translator/${props.email}`))
        .then(response =>{
            console.log("kaka")
            console.log('can reach here 3 received data', response.data);
            response.data.reverse()
            setData(response.data)
            lasttranslated = response.data[0].translated
            console.log("find last translated: ", lasttranslated)
            setTranslated(lasttranslated);



        })
        .catch((error)=> {
            console.log({status: 'bad cannot get from server 2nd time', msg: error.message})
        })
    }

    // lastItem = data[data.length - 1 ]
    // console.log("find last item",lastItem)

    if (email) {
    return (
        <div>
            <h1 className="" style={{textDecoration:"none", color:"black"}}>
                Language Translator
            </h1>
            <div className="" style={{display:"inline-block", width:"900px", margin:"20px"}}>
                <div>
                    <div style={{color:"red",fontSize:"23px"}}>{prompt}</div>
                    <form onSubmit={handleSubmit} >
                    <div class="form-group">
                        <label htmlFor="fromselect" style={{color:"white"}}>Original Language:</label>
                        <select class="form-control" name="language" style={{backgroundColor: "#FFFBEB"}} id="fromselect" onChange={(e)=> setFrom(e.target.value)}>
                            <option value="af">Afrikaans</option>
                            <option value="sq">Albanian</option>
                            <option value="ar">Arabic</option>
                            <option value="hy">Armenian</option>
                            <option value="zh-cn">Chinese Simplified</option>
                            <option value="zh-tw">Chinese Traditional</option>
                            <option value="hr">Croatian</option>
                            <option value="cs">Czech</option>
                            <option value="da">Danish</option>
                            <option value="nl">Dutch</option>
                            <option value="en" selected>English</option>
                            <option value="eo">Esperanto</option>
                            <option value="tl">Filipino</option>
                            <option value="fi">Finnish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="el">Greek</option>
                            <option value="ht">Haitian Creole</option>
                            <option value="hi">Hindi</option>
                            <option value="hu">Hungarian</option>
                            <option value="is">Icelandic</option>
                            <option value="id">Indonesian</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="la">Latin</option>
                            <option value="lv">Latvian</option>
                            <option value="mk">Macedonian</option>
                            <option value="ms">Malay</option>
                            <option value="no">Norwegian</option>
                            <option value="pl">Polish</option>
                            <option value="pt">Portuguese</option>
                            <option value="ro">Romanian</option>
                            <option value="ru">Russian</option>
                            <option value="sr">Serbian</option>
                            <option value="sk">Slovak</option>
                            <option value="es">Spanish</option>
                            <option value="sw">Swahili</option>
                            <option value="sv">Swedish</option>
                            <option value="ta">Tamil</option>
                            <option value="th">Thai</option>
                            <option value="tr">Turkish</option>
                            <option value="vi">Vietnamese</option>
                            <option value="cy">Welsh</option>
                        </select>
                    </div>
                        <div class="form-group">
                            <label htmlFor="text" style={{color:"white"}}>Write Text:</label>
                            <textarea class="form-control" style={{backgroundColor: "#FFFBEB"}} name="text" required id="text" onChange={(e)=> setText(e.target.value)} value={text} cols="20" rows="8" placeholder="text to translate"></textarea>
                        </div>
                
                        <div class="form-group">
                            <br/>
                            <label htmlFor="fromselect">Select Language to Translate:</label>
                            <select class="form-control" style={{backgroundColor: "#FFFBEB"}} name="language" id="fromselect" onChange={(e)=> setTo(e.target.value)}>
                                <option value="af" selected>Afrikaans</option>
                                <option value="sq">Albanian</option>
                                <option value="ar">Arabic</option>
                                <option value="hy">Armenian</option>
                                <option value="zh-cn">Chinese Simplified</option>
                                <option value="zh-tw">Chinese Traditional</option>
                                <option value="hr">Croatian</option>
                                <option value="cs">Czech</option>
                                <option value="da">Danish</option>
                                <option value="nl">Dutch</option>
                                <option value="en">English</option>
                                <option value="eo">Esperanto</option>
                                <option value="tl">Filipino</option>
                                <option value="fi">Finnish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="el">Greek</option>
                                <option value="ht">Haitian Creole</option>
                                <option value="hi">Hindi</option>
                                <option value="hu">Hungarian</option>
                                <option value="is">Icelandic</option>
                                <option value="id">Indonesian</option>
                                <option value="it">Italian</option>
                                <option value="ja">Japanese</option>
                                <option value="ko">Korean</option>
                                <option value="la">Latin</option>
                                <option value="lv">Latvian</option>
                                <option value="mk">Macedonian</option>
                                <option value="ms">Malay</option>
                                <option value="no">Norwegian</option>
                                <option value="pl">Polish</option>
                                <option value="pt">Portuguese</option>
                                <option value="ro">Romanian</option>
                                <option value="ru">Russian</option>
                                <option value="sr">Serbian</option>
                                <option value="sk">Slovak</option>
                                <option value="es">Spanish</option>
                                <option value="sw">Swahili</option>
                                <option value="sv">Swedish</option>
                                <option value="ta">Tamil</option>
                                <option value="th">Thai</option>
                                <option value="tr">Turkish</option>
                                <option value="vi">Vietnamese</option>
                                <option value="cy">Welsh</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-danger btn-block" onClick={handleSubmit}>
                                Translate
                            </button>
                        </div>
                        <div class="form-group">
                                <div>
                                    <label htmlFor="translated">Translated Text:</label>
                                    <div className="form-control" id="translated" style={{backgroundColor: "#FFFBEB", height:"auto"}}>
                                        {translated}
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div> 
            <span style={{ display:"inline-block", verticalAlign:"top", backgroundColor:"#FFFBEB", margin:"50px", width:"500px", height:"auto"}}>
                <h1 style={{textDecoration:"none", color:"black"}}>History: </h1>
                {data.slice(0,7).map((element, index) => {
                    return (
                        <div key={element._id} style={{textAlign:"center"}}>
                            <div> {element.from} &#8594; {element.to} </div>
                            <div className="" style={{padding:"3px"}}>{element.text} : {element.translated}</div>
                        </div>
                    )
                })}
            </span>
        </div>
    )
    } else {
        return (<Login />)
    }
}

export default Translator
