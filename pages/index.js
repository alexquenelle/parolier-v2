import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const [songTitle, setSongTitle] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('api/getAll').then((data) => {
            console.log(data.data[0].song_title);
            setSongTitle(data.data);
        });
    }, []);

    return (
        <>
            <>welcome to parolier-V2</>
            <br />
            <button onClick={() => router.push('/addSong')}>Add data</button>
            <ol>
                {songTitle.map((eachSong) => (
                    <li key={eachSong.id}>
                        <button
                            type="button"
                            onClick={() => {
                                router.push({
                                    pathname: '/song',
                                    query: { id: eachSong.id },
                                });
                            }}>
                            {eachSong.song_title} - {eachSong.song_buffer}
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
}
