import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function Song() {
    const router = useRouter();
    const [songData, setSongData] = useState([]);
    const idToFecth = router.query.id;

    useEffect(() => {
        console.log(router.query.id);
        axios.get(`/api/getOneById`, { params: { id: idToFecth } }).then((data) => {
            console.log(data.data);
            setSongData(data.data);
        });
    }, []);

    return (
        <>
            <Typography color="textPrimary" variant="h4">
                {songData.song_title}
            </Typography>
            <Divider variant="middle" />
            <Typography style={{ whiteSpace: 'pre-line' }} color="textPrimary" variant="h5">
                {songData.song_buffer}
            </Typography>
        </>
    );
}