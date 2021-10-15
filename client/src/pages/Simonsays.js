import "../App.css";
import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import timeout from "../components/util";
import {Link} from 'react-router-dom';
import axios from 'axios';

function Simonsays(props) {


    const uri = "http://localhost:5000/"
    const [highestscore,setHighestscore] = useState();
    const [data, setData] = useState([])

    useEffect(()=>{
        getData();
    },[props])
    
    function getData (){
   
        axios.get((uri + `highestscore/${props.email}`))
        .then(response =>{
            console.log('received data');
            console.log('dataaaaa',response.data); 
            setData(response.data)
            console.log('score',response.data[0].highestscore);
            let scorenow = response.data[0].highestscore;
            setHighestscore(scorenow);
            console.log("check score here", highestscore) //print undefined
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }


    const [isOn, setIsOn] = useState(false);

    const colorList = ["green", "red", "yellow", "blue"];

    let startPlay = {
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
    };

    const [game, setGame] = useState(startPlay);
    const [flashColor, setFlashColor] = useState("");

    function startHandle() {
        setIsOn(true);
    }

    useEffect(() => {
        if (isOn) {
            setGame({ ...startPlay, isDisplay: true });
        } else {
            setGame(startPlay);
        }
    }, [isOn]);

    useEffect(() => {
        if (isOn && game.isDisplay) {
            let newColor = colorList[Math.floor(Math.random() * 4)];

            const copyColors = [...game.colors];
            copyColors.push(newColor);
            setGame({ ...game, colors: copyColors });
        }
    }, [isOn, game.isDisplay]);

    useEffect(() => {
        if (isOn && game.isDisplay && game.colors.length) {
            displayColors();
        }
    }, [isOn, game.isDisplay, game.colors.length]);

    async function displayColors() {
        await timeout(500);
        for (let i = 0; i < game.colors.length; i++) {
            setFlashColor(game.colors[i]);
            await timeout(500);
            setFlashColor("");
            await timeout(500);

        if (i === game.colors.length - 1) {
            const copyColors = [...game.colors];

            setGame({
                ...game,
                isDisplay: false,
                userPlay: true,
                userColors: copyColors.reverse(),
              });
            }
        }
    }

    async function cardClickHandle(color) {
        if (!game.isDisplay && game.userPlay) {
            const copyUserColors = [...game.userColors];
            const lastColor = copyUserColors.pop();
            setFlashColor(color);

            if (color === lastColor) {
                if (copyUserColors.length) {
                    setGame({ ...game, userColors: copyUserColors });
                } else {
                    await timeout(500);
                    setGame({
                    ...game,
                    isDisplay: true,
                    userPlay: false,
                    score: game.colors.length,
                    userColors: [],
                });
            }
        } else {
            await timeout(500);
            setGame({ ...startPlay, score: game.colors.length-1 });
        }
        await timeout(500);
        setFlashColor("");
        }
    }

 
    function closeHandle(e) {
        e.preventDefault();
        if (game.score > highestscore) {
            console.log("check game.score here", game.score)
            setHighestscore(game.score);
            console.log('highestScore',highestscore)
            console.log("check1 ")
        }
        setIsOn(false);
        let score = game.score;
        const data = {
            highestscore:score,
        }
    
        console.log("check2 ")
        console.log('check2 data',data)
        axios.put((uri + `highestscore/${props.email}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log('see the new data',response.data);
            console.log("THIS new data",data);
            //window.location.href = "/game";
        })
        .catch((error)=> {
            console.log({status: 'bad cant submit', msg: error.message})
        })
    }


    return (
        <div className="App">
            <div className="highestscore">Personal Highest Score : {highestscore && highestscore}</div>
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

                    {isOn && !game.isDisplay && !game.userPlay && game.score && (
                    <div className="lost">
                        <div>Your Score: {game.score}</div>
                        <button onClick={closeHandle}>Replay</button>
                    </div>
                    )}
                    {!isOn && !game.score && (
                    <button onClick={startHandle} className="startButton">
                        Start
                    </button>
                    )}
                    {isOn && (game.isDisplay || game.userPlay) && (
                    <div className="score">{game.score}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Simonsays;