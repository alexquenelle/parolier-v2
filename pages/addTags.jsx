import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CancelIcon from '@mui/icons-material/Cancel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Cookies from 'universal-cookie';

export default function Home() {
    const router = useRouter();
    let tagName = undefined;
    const errorString = 'This input field cannot be empty.';
    const [errorEmptyField, setErrorEmptyField] = useState('');
    const [songAddedSuccessfully, setSongAddedSuccessfully] = useState(false);
    const [modifyTags, setModifyTags] = useState(false);
    const [tags, setTags] = useState([]);
    const textInput_title = React.useRef(null);
    const cookies = new Cookies();

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
                console.log(response.data);
                if (response.status === 200) {
                    setSongAddedSuccessfully(true);
                    setTags((tags) => [...tags, response.data]);
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
                onClick={() => router.push('/settings')}
            >You first need to login</Button>
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
                            <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                                <Typography color="textPrimary" variant="h4">
                                    List of tags
                                </Typography>
                                <Box>
                                    <SettingsIcon
                                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => {
                                            setModifyTags(!modifyTags);
                                        }}
                                    />
                                </Box>
                            </Box>
                            {tags.map((tag) => {
                                if (modifyTags === false) {
                                    return (
                                        <List
                                            Key={tag.id}
                                            onClick={() => {
                                                router.push({
                                                    pathname: '/song',
                                                    query: { id: eachSong.id },
                                                });
                                            }}
                                            style={{
                                                border: '1px solid black',
                                                borderRadius: '5px',
                                                margin: '10px',
                                            }}>
                                            <ListItem>
                                                <ListItemText primary={tag.tag_name} />
                                            </ListItem>
                                        </List>
                                    );
                                } else {
                                    return (
                                        <>
                                            <List
                                                Key={tag.id}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '5px',
                                                    margin: '10px',
                                                }}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                    <ListItem>
                                                        <ListItemText primary={tag.tag_name} />
                                                    </ListItem>
                                                    <CancelIcon
                                                        style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            axios
                                                                .get(`/api/deleteTagsById`, { params: { id: tag.id } })
                                                                .then((data) => {
                                                                    console.log(data.data);
                                                                });
                                                            setTags((tags) =>
                                                                tags.filter((eachTag) => eachTag.id !== tag.id),
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                            </List>
                                        </>
                                    );
                                }
                            })}
                        </form>
                    </Container>
                </Box>
            </>
        );
    }
}
