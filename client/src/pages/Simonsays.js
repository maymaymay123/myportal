import "../App.css";
import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import axios from 'axios';
import Login from '../components/Login'

function Simonsays(props) {


    const uri = "http://localhost:5000/"
    const [highestscore,setHighestscore] = useState(0);
    const [data, setData] = useState([])
    const email = props.email;

    useEffect(()=>{
        getData();
    },[props])
    
    function getData (){
   
        axios.get((uri + `highestscore/${props.email}`))
        .then(response =>{
            console.log('received score data from server');
            console.log('dataaaaa',response.data); 
            if (response.data.length === 0){
                const data = {
                    highestscore,
                    email
                };
                console.log("checkkkkk")
                axios.post((uri + "highestscore/add"),data)
                .then(response =>{
                    console.log('posted new user', response);
                })
                .catch((error)=> {
                    console.log({status: 'bad cant post', msg: error.message})
                })
            }
            setData(response.data)
            console.log("check score data",response.data)
            setHighestscore(response.data[0].highestscore)
            console.log("check highest score", highestscore)
        })
        .catch((error)=> {
            console.log({status: 'bad cant get db', msg: error.message})
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

    function startSubmit(e) {
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


    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

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
            setGame({ ...startPlay, score: game.colors.length });
        }
        await timeout(500);
        setFlashColor("");
        }
    }

 
    function replaySubmit(e) {
        e.preventDefault();
        console.log("gm scr",game.score)
        if (game.score > highestscore) {
            console.log("check game.score here", game.score)
            setHighestscore(game.score);
            console.log('highestScore',highestscore)
            console.log("check1 ")
        
        setIsOn(false);
        const data = {
            highestscore:game.score,
            email,
        }
    
        console.log("check2 ")
        console.log('check2 data',data)
        axios.put((uri + `highestscore/${props.email}`), data)
        .then(response =>{
            console.log('received edited data');
            console.log('see the new data',response.data);
            console.log("latest new data",data);
            //window.location.href = "/game";
        })
        .catch((error)=> {
            console.log({status: 'bad cant submit', msg: error.message})
        })
        } else {
            setIsOn(false) 
        } 
    }

    if (email) {
    return (
        <div className="">
            <div className="highestscore">Personal Highest Score : {highestscore}</div>
            <div className="wholecircle" style={{marginTop:"30px"}}>
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
                        <button onClick={replaySubmit}>Replay</button>
                    </div>
                    )}
                    {!isOn && !game.score && (
                    <button onClick={startSubmit} className="startButton">
                        Start
                    </button>
                    )}
                    {isOn && (game.isDisplay || game.userPlay) && (
                    <div className="score">{game.score}</div>
                    )}
                </div>
            </div>
        </div>
    )
    } else {
        return (<Login />)
    }
}

export default Simonsays;