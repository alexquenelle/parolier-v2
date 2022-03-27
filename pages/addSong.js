import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    let songTitle = undefined;
    let songBuffer = undefined;

    const add_data = () => {
        axios({
            method: 'post',
            url: 'api/add',
            data: {
                song_title: songTitle,
                song_buffer: songBuffer,
            },
        });
    };

    return (
        <>
            <button onClick={() => router.back()}>go back</button>
            <br />
            <>Song title</>
            <input
                onChange={() => {
                    songTitle = event.target.value;
                }}
            />
            <br />
            <>Song lyrics</>
            <input
                onChange={() => {
                    songBuffer = event.target.value;
                }}
            />
            <br />
            <button onClick={add_data}>Submit</button>
        </>
    );
}
