import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';

export default function Home() {
    const router = useRouter();
    let songTitle = undefined;
    let songBuffer = undefined;
    const errorString = 'This input field cannot be empty.';
    const [errorEmptyField, setErrorEmptyField] = useState('');

    const add_data = () => {
        console.log(songBuffer);
        if (songTitle === undefined || songTitle === '' || songBuffer === undefined || songBuffer === '') {
            setErrorEmptyField(errorString);
        } else {
            axios({
                method: 'post',
                url: 'api/add',
                data: {
                    song_title: songTitle,
                    song_buffer: songBuffer,
                },
            });
        }
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}>
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Add a new song !
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            error={errorEmptyField !== ''}
                            helperText={errorEmptyField}
                            label="Title"
                            margin="normal"
                            maxRows={Infinity}
                            multiline
                            onChange={() => {
                                songTitle = event.target.value;
                                setErrorEmptyField('');
                            }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            error={errorEmptyField !== ''}
                            helperText={errorEmptyField}
                            label="Lyrics"
                            margin="normal"
                            multiline
                            maxRows={Infinity}
                            onChange={() => {
                                songBuffer = event.target.value;
                                setErrorEmptyField('');
                            }}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                style={{ borderRadius: '5px' }}
                                fullWidth
                                size="large"
                                onClick={add_data}
                                variant="contained">
                                Add
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
}
