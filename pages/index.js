import axios from 'axios';
import React, { useState } from 'react';

export default function Home() {
    const [songTitle, setSongTitle] = useState([]);

    const get_data = () => {
        axios.get('api/get').then((data) => {
            console.log(data.data[0].song_title);
            setSongTitle(data.data);
        });
    };

    const add_data = () => {
        axios.get('api/add').then((data) => {
            console.log(data.data);
        });
    };

    return (
        <>
            <>welcome to parolier-V2</>
            <br />
            <button onClick={get_data}>Get data</button>
            <button onClick={add_data}>Add data</button>
            {/* {songTitle.song_title} */}
            {/* {songTitle ? <>{songTitle}</> : <></>} */}
            <ol>
                {songTitle.map((eachSong) => (
                    <li key={eachSong.song_title}>{eachSong.song_title}</li>
                ))}
            </ol>
        </>
    );
}
