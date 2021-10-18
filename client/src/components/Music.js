import React, { useState, useEffect } from "react";
import music from "../music.mp3";
import styles from "../styles.css"

const useAudio = url => {
    const [audio] = useState(new Audio(music));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },[playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        }}, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <span onClick={toggle}>{playing ? <img src="./melody.png" className="melody" width="50px" height="50px"/> : <img src="./melody.png" className="melody" width="50px" height="50px"/>}</span>
    );
};

export default Player;