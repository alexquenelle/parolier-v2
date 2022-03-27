import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Song() {
    const router = useRouter();
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        console.log(router.query.id);
        axios.get(`/api/getOneById`, { params: { id: router.query.id } }).then((data) => {
            console.log(data.data);
            setSongData(data.data);
        });
    }, []);

    return (
        <>
            <button onClick={() => router.back()}>go back</button>
            <h1>{songData.song_title}</h1>
            <p>{songData.song_buffer}</p>
        </>
    );
}
