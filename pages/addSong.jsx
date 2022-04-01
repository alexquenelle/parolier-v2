import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cookies from 'universal-cookie';

export default function Home() {
    const router = useRouter();
    const [songTitle, setSongTitle] = useState('');
    const [songBuffer, setSongBuffer] = useState('');
    const errorString = 'This input field cannot be empty.';
    const [errorEmptyField, setErrorEmptyField] = useState('');
    const [songAddedSuccessfully, setSongAddedSuccessfully] = useState(false);
    const [tags, setTags] = useState([]);
    const textInput_lyrics = React.useRef(null);
    const textInput_title = React.useRef(null);
    const cookies = new Cookies();
    const [tagSelected, setTagSelected] = useState([]);

    useEffect(() => {
        axios.get('api/getAllTags').then((data) => {
            console.log(data.data);
            setTags(data.data);
        });
    }, []);

    const add_data = () => {
        console.log(songTitle + ' ' + songBuffer);
        if (songTitle === undefined || songTitle === '' || songBuffer === undefined || songBuffer === '') {
            setErrorEmptyField(errorString);
        } else {
            axios({
                method: 'post',
                url: 'api/add',
                data: {
                    song_title: songTitle,
                    song_buffer: songBuffer,
                    tags: tagSelected,
                },
            }).then((response) => {
                if (response.status === 200) {
                    textInput_lyrics.current.value = '';
                    textInput_title.current.value = '';
                    setSongAddedSuccessfully(true);
                }
            });
        }
    };

    if (cookies.get('adminConnected') === undefined) {
        return (
            <Button
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                variant="contained"
                color="primary"
                onClick={() => router.push('/settings')}>
                You first need to login
            </Button>
        );
    } else {
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
                                inputRef={textInput_title}
                                margin="normal"
                                maxRows={Infinity}
                                multiline
                                onChange={() => {
                                    // songTitle = event.target.value;
                                    setSongTitle(event.target.value);
                                    setErrorEmptyField('');
                                }}
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                error={errorEmptyField !== ''}
                                helperText={errorEmptyField}
                                label="Lyrics"
                                inputRef={textInput_lyrics}
                                margin="normal"
                                multiline
                                maxRows={Infinity}
                                onChange={(event) => {
                                    // songBuffer = event.target.value;
                                    setSongBuffer(event.target.value);
                                    setErrorEmptyField('');
                                }}
                                variant="outlined"
                            />
                            <Box sx={{ my: 3 }}>
                                <Typography color="textPrimary" variant="h4">
                                    Tags
                                </Typography>
                            </Box>
                            <Box sx={{ my: 3 }}>
                                {tags.map((tag) => {
                                    return (
                                        <Button
                                            variant={tagSelected.includes(tag.tag_name) ? 'contained' : 'outlined'}
                                            key={tag.id}
                                            onClick={() => {
                                                console.log(tagSelected);
                                                if (tagSelected.includes(tag.tag_name)) {
                                                    setTagSelected(
                                                        tagSelected.filter(
                                                            (tagSelected) => tagSelected !== tag.tag_name,
                                                        ),
                                                    );
                                                } else {
                                                    setTagSelected([...tagSelected, tag.tag_name]);
                                                }
                                            }}>
                                            {tag.tag_name}
                                        </Button>
                                    );
                                })}
                            </Box>
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
                                            Add an other song
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        color="primary"
                                        style={{ borderRadius: '5px' }}
                                        fullWidth
                                        size="large"
                                        onClick={add_data}
                                        variant="contained">
                                        Add
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </Container>
                </Box>
            </>
        );
    }
}
