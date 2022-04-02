import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, TextField, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Song() {
    const router = useRouter();
    const [songData, setSongData] = useState([]);
    const idToFecth = router.query.id;
    const [newSongTitle, setNewSongTitle] = useState('');
    const [newSongBuffer, setNewSongBuffer] = useState('');
    const [songAddedSuccessfully, setSongAddedSuccessfully] = useState(false);

    useEffect(() => {
        axios.get(`/api/getOneById`, { params: { id: idToFecth } }).then((data) => {
            setSongData(data.data);
        });
    }, []);

    const update_data = () => {
        axios({
            method: 'put',
            url: `/api/modifySongById`,
            data: {
                id: idToFecth,
                song_title: newSongTitle,
                song_buffer: newSongBuffer,
            },
        }).then((response) => {
            if (response.status === 200) {
                setSongAddedSuccessfully(true);
            }
        });
    };

    return (
        <>
            <Typography color="textPrimary" variant="h4">
                ModifySong Title
            </Typography>
            <TextField
                fullWidth
                // label="Title"
                margin="normal"
                maxRows={Infinity}
                defaultValue={songData.song_title}
                multiline
                onChange={() => {
                    setNewSongTitle(event.target.value);
                }}
                variant="outlined"
            />

            <Typography color="textPrimary" variant="h4">
                Modify Song Lyrics
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                multiline
                defaultValue={songData.song_buffer}
                maxRows={Infinity}
                onChange={(event) => {
                    setNewSongBuffer(event.target.value);
                }}
                variant="outlined"
            />
            <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                {songAddedSuccessfully ? (
                    <>
                        <CheckCircleIcon fontSize="large" />
                        <Button
                            color="primary"
                            style={{ borderRadius: '5px' }}
                            fullWidth
                            size="large"
                            onClick={() => setSongAddedSuccessfully(false)}
                            variant="contained">
                            Modify Again
                        </Button>
                    </>
                ) : (
                    <Button
                        color="primary"
                        style={{ borderRadius: '5px' }}
                        fullWidth
                        size="large"
                        onClick={update_data}
                        variant="contained">
                        {' '}
                        Modify Song
                    </Button>
                )}
            </Box>
        </>
    );
}
