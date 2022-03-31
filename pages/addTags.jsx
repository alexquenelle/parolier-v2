import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Home() {
    const router = useRouter();
    let tagName = undefined;
    const errorString = 'This input field cannot be empty.';
    const [errorEmptyField, setErrorEmptyField] = useState('');
    const [songAddedSuccessfully, setSongAddedSuccessfully] = useState(false);
    const [tags, setTags] = useState([]);
    const textInput_lyrics = React.useRef(null);
    const textInput_title = React.useRef(null);

    useEffect(() => {
        axios.get('api/getAllTags').then((data) => {
            console.log(data.data);
            setTags(data.data);
        });
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const add_data = () => {
        console.log(tagName);
        if (tagName === undefined || tagName === '') {
            setErrorEmptyField(errorString);
        } else {
            axios({
                method: 'post',
                url: 'api/addTags',
                data: {
                    tag: tagName,
                },
            }).then((response) => {
                if (response.status === 200) {
                    setSongAddedSuccessfully(true);
                }
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
                                Add a new Tag !
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
                                tagName = event.target.value;
                                setErrorEmptyField('');
                            }}
                            variant="outlined"
                        />
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                List of tags
                            </Typography>
                        </Box>
                        <Box sx={{ my: 3 }}>
                            {tags.map((tag) => {
                                return (
                                    <Button
                                        variant="outlined"
                                        key={tag.id}
                                        onClick={() => {
                                            console.log(tag.id);
                                        }}
                                        disabled>
                                        {tag.tag_name}
                                    </Button>
                                );
                            })}
                        </Box>
                        <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                            {songAddedSuccessfully ? (
                                <>
                                    <CheckCircleIcon fontSize="large" />
                                    <Button onClick={add_data} fullWidth variant="contained">
                                        Add Tag Another
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={add_data} fullWidth variant="contained">
                                    Add Tag
                                </Button>
                            )}
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
}
