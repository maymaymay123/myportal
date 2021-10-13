import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'

const Translator = (props) => {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    useEffect(()=>{
        getData();
    },[props])

    function getData (){
   
        axios.get((uri + `translator/${props.email}`))
        .then(response =>{
            console.log('received data');
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div>
            <Link to="/dashboard">Dashboard</Link>
            {props.email && (<div>Hi, <b>{props.username} </b></div>)}
            <Logout />
            <div class="container">
                <h1 class="">
                    Language Translator
                </h1>
                <form action="localhost:5000/speechtranslator" method="post">
                    <div class="form-group">
                        <label for="speech">Write Text:</label>
                        <textarea class="form-control" name="speech" required id="speech" cols="30" rows="10"></textarea>
                    </div>
            
                    <div class="form-group">
                        <label for="format">Select Language to Translate:</label>
                        <select class="form-control" name="language" id="format">
                            <option value="af">Afrikaans</option>
                            <option value="sq">Albanian</option>
                            <option value="ar">Arabic</option>
                            <option value="hy">Armenian</option>
                            <option value="ca">Catalan</option>
                            <option value="zh">Chinese</option>
                            <option value="hr">Croatian</option>
                            <option value="cs">Czech</option>
                            <option value="da">Danish</option>
                            <option value="nl">Dutch</option>
                            <option value="en" selected>English</option>
                            <option value="en-au">English (Australia)</option>
                            <option value="en-uk">English (United Kingdom)</option>
                            <option value="en-us">English (United States)</option>
                            <option value="eo">Esperanto</option>
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
                            <option value="no">Norwegian</option>
                            <option value="pl">Polish</option>
                            <option value="pt">Portuguese</option>
                            <option value="pt-br">Portuguese (Brazil)</option>
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
                        <button class="btn btn-danger btn-block">
                            Translate
                        </button>
                    </div>
                    <div class="form-group">
                        <label for="translated">Translated Text:</label>
                        <textarea class="form-control" name="translated" id="" cols="30" rows="10">Translated</textarea>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Translator
