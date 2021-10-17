import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'


const Translator = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"
    const [from, setFrom] = useState('en')
    const [to, setTo] = useState('')
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
            console.log('received data');
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
            to,
            text,
            email
        };
        console.log("can reach here")
        if (!(from && to && text)){
            setPrompt(
                <div onClose={() => setPrompt(false)} >
                    Please enter all fields!
                </div>
                )
        } else if (!isNaN(text)) {
            setPrompt(
                <div onClose={() => setPrompt(false)} >
                    All fields should be in string!
                </div>
            )
        }
        console.log("can reach here too")
        axios.post((uri + "translator/"),data)
        .then(response =>{
            console.log('posted data',data)
            // setFrom('en')
            // setTo('');
            setText('');
            setTranslated('')
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

    return ( 
        <div>
            <h1 class="">
                Language Translator
            </h1>
            <div className="" style={{display:"inline-block", width:"900px", height:"900px", margin:"20px"}}>
                <div>
                    <form onSubmit={handleSubmit} >
                    <div class="form-group">
                        <label for="fromselect">Original Language:</label>
                        <select class="form-control" name="language" id="fromselect" onChange={(e)=> setFrom(e.target.value)}>
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
                            <label for="text">Write Text:</label>
                            <textarea class="form-control" name="text" required id="text" onChange={(e)=> setText(e.target.value)} value={text} cols="20" rows="7" placeholder="text to translate"></textarea>
                        </div>
                
                        <div class="form-group">
                            <label for="fromselect">Select Language to Translate:</label>
                            <select class="form-control" name="language" id="fromselect" onChange={(e)=> setTo(e.target.value)}>
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
                                    <label for="translated">Translated Text:</label>
                                    <div class="form-control" name="translated" id="" cols="40" rows="7">
                                        {translated}
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div> 
            <span style={{ display:"inline-block", verticalAlign:"top", backgroundColor:"white", margin:"50px", width:"500px", height:"480px"}}>
                <h1>History: </h1>
                {data.slice(0,5).map((element, index) => {
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
}

export default Translator
