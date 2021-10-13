import "../App.css";
import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import timeout from "../components/util";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Logout from '../components/Logout'

function Simonsays(props) {

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    useEffect(()=>{
        getData();
    },[props])
    
    function getData (){
   
        axios.get((uri + `score/${props.email}`))
        .then(response =>{
            console.log('received data');
            setData(response.data);
            console.log('data',data); 
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    const [isOn, setIsOn] = useState(false);

    const colorList = ["green", "red", "yellow", "blue"];

    const initPlay = {
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
    };

    const [play, setPlay] = useState(initPlay);
    const [flashColor, setFlashColor] = useState("");
    const [audio, setAudio] = useState("")

    function startHandle() {
        setIsOn(true);
    }

    useEffect(() => {
        if (isOn) {
            setPlay({ ...initPlay, isDisplay: true });
        } else {
            setPlay(initPlay);
        }
    }, [isOn]);

    useEffect(() => {
        if (isOn && play.isDisplay) {
            let newColor = colorList[Math.floor(Math.random() * 4)];

            const copyColors = [...play.colors];
            copyColors.push(newColor);
            setPlay({ ...play, colors: copyColors });
        }
    }, [isOn, play.isDisplay]);

    useEffect(() => {
        if (isOn && play.isDisplay && play.colors.length) {
            displayColors();
        }
    }, [isOn, play.isDisplay, play.colors.length]);

    async function displayColors() {
        await timeout(500);
        for (let i = 0; i < play.colors.length; i++) {
            setFlashColor(play.colors[i]);
            await timeout(500);
            setFlashColor("");
            await timeout(500);

        if (i === play.colors.length - 1) {
            const copyColors = [...play.colors];

            setPlay({
                ...play,
                isDisplay: false,
                userPlay: true,
                userColors: copyColors.reverse(),
              });
            }
        }
    }

    async function cardClickHandle(color) {
        if (!play.isDisplay && play.userPlay) {
            const copyUserColors = [...play.userColors];
            const lastColor = copyUserColors.pop();
            setFlashColor(color);

            if (color === lastColor) {
                if (copyUserColors.length) {
                    setPlay({ ...play, userColors: copyUserColors });
                } else {
                    await timeout(500);
                    setPlay({
                    ...play,
                    isDisplay: true,
                    userPlay: false,
                    score: play.colors.length,
                    userColors: [],
                });
            }
        } else {
            await timeout(500);
            setPlay({ ...initPlay, score: play.colors.length });
        }
        await timeout(500);
        setFlashColor("");
        }
    }

    function closeHandle() {
        setIsOn(false);
    }


    return (
        <div className="App">
            <Link to="/dashboard">Dashboard</Link>
            {props.email && (<div>Hi, <b>{props.username} </b></div>)}
            <Logout />
            <hr />
            <div className="highestscore">Highest Score :</div>
            <div className="wholecircle">
                <div className="frame">
                    <div className="cardWrapper">
                        {colorList &&
                        colorList.map((v, i) => (
                        <ColorCard
                            onClick={() => {
                            cardClickHandle(v);
                            }}
                            flash={flashColor === v}
                            color={v}
                        ></ColorCard>
                        ))}
                    </div>

                    {isOn && !play.isDisplay && !play.userPlay && play.score && (
                    <div className="lost">
                        <div>Your Score: {play.score}</div>
                        <button onClick={closeHandle}>Replay</button>
                    </div>
                    )}
                    {!isOn && !play.score && (
                    <button onClick={startHandle} className="startButton">
                        Start
                    </button>
                    )}
                    {isOn && (play.isDisplay || play.userPlay) && (
                    <div className="score">{play.score}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Simonsays;