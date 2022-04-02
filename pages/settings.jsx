import Router from 'next/router';
import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MusicNote from '@mui/icons-material/MusicNote';
import IconsDropdown from './iconsDropdown';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

const Login = (props) => {
    let errorBool = false;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorEmptyFieldEmail, setErrorEmptyFieldEmail] = useState('');
    const [errorEmptyFieldPassword, setErrorEmptyFieldPassword] = useState('');
    const errorString = 'This input field cannot be empty.';
    const cookies = new Cookies();
    const [isConnected, setUserConnected] = useState(cookies.get('adminConnected'));
    const [isAllCheckBoxesChecked, setIsAllCheckBoxesChecked] = useState(false);
    const [songs, setSongs] = useState([]);
    const [songTags, setSongTag] = useState([]);
    const router = useRouter();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        axios.get('api/getAll').then((data) => {
            data.data.sort(function (a, b) {
                if (a.song_title.toLowerCase() < b.song_title.toLowerCase()) {
                    return -1;
                }
                if (a.song_title.toLowerCase() > b.song_title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            let display = true;
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].display === false) {
                    display = false;
                }
            }
            setIsAllCheckBoxesChecked(display);

            setSongs(data.data);
            axios.get('api/getAllTags').then((data) => {
                // let allTagsInSongs = [];
                // songs.forEach((song) => {
                //     console.log(song);
                //     song.tags.forEach((tag) => {
                //         if (song.display === true) {
                //             allTagsInSongs.push(tag);
                //         }
                //     });
                // });
                // console.log(allTagsInSongs);

                let arrayVariant = data.data.map((v) => Object.assign(v, { variant: 'outlined' }));

                // arrayVariant.forEach((tag) => {
                //     if (allTagsInSongs.includes(tag.tag_name)) {
                //         tag.variant = 'contained';
                //     }
                // });

                setSongTag(arrayVariant);
            });
        });
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpenErrorModal = () => setOpen(true);
    const handleCloseErrorModal = () => setOpen(false);

    const updatePassword = (event) => {
        setErrorEmptyFieldPassword('');
        setUserPassword(event.target.value);
    };

    const updateEmail = (event) => {
        setErrorEmptyFieldEmail('');
        setUserEmail(event.target.value);
    };

    async function submit() {
        if (userPassword === '') {
            errorBool = true;
            setErrorEmptyFieldPassword(errorString);
        } else setErrorEmptyFieldPassword('');

        if (userEmail === '') {
            errorBool = true;
            setErrorEmptyFieldEmail(errorString);
        } else setErrorEmptyFieldEmail('');

        console.log(errorBool);

        const adminsData = await axios.get('api/getAllAdmins').then();

        if (errorBool === false) {
            if (adminsData.data.length > 0) {
                if (adminsData.data[0].userName === userEmail && adminsData.data[0].password === userPassword) {
                    cookies.set('adminConnected', adminsData.data[0].userName, { path: '/' });
                    console.log('success');
                    setUserConnected(true);
                } else {
                    handleOpenErrorModal();
                }
            } else {
                console.log('error');
            }
        }
    }

    const setDisplayedSongs = (id, boolIsDisplayable) => {
        axios({
            method: 'put',
            url: 'api/updateDisplayableSongs',
            data: {
                id: id,
                boolIsDisplayable: boolIsDisplayable,
            },
        });
        setSongs(
            songs.map((song) => {
                if (song.id === id) {
                    song.display = boolIsDisplayable;
                }
                return song;
            }),
        );

        // check if all checkboxes are checked
        let display = true;
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].display === false) {
                display = false;
            }
        }
        setIsAllCheckBoxesChecked(display);
    };

    const deleteSong = (songId) => {
        axios.get(`/api/deleteSongById`, { params: { id: songId } }).then((data) => {
            console.log(data.data);
        });
        setSongs((songs) => songs.filter((song) => song.id !== songId));
    };

    if (isConnected) {
        return (
            <>
                <Button
                    color="primary"
                    style={{ borderRadius: '5px', marginTop: '10px' }}
                    fullWidth={true}
                    size="large"
                    onClick={() => Router.push('/addSong')}
                    variant="contained">
                    Add a new song
                </Button>
                <Button
                    color="primary"
                    style={{ borderRadius: '5px', marginTop: '10px' }}
                    fullWidth={true}
                    size="large"
                    onClick={() => Router.push('/addTags')}
                    variant="contained">
                    Add a new tag
                </Button>
                <Divider variant="middle" style={{ margin: '20px', backgroundColor: 'black' }} />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {songTags.map((eachTag) => (
                        <Grid item xs={2} sm={4} md={4} key={eachTag.id}>
                            <Button
                                onClick={() => {
                                    if (eachTag.variant === 'outlined') {
                                        setSongTag((songTag) =>
                                            songTag.map((tag) =>
                                                tag.tag_name === eachTag.tag_name
                                                    ? { ...tag, variant: 'contained' }
                                                    : tag,
                                            ),
                                        );
                                    } else {
                                        setSongTag((songTag) =>
                                            songTag.map((tag) =>
                                                tag.tag_name === eachTag.tag_name
                                                    ? { ...tag, variant: 'outlined' }
                                                    : tag,
                                            ),
                                        );
                                    }
                                }}
                                fullWidth
                                variant={eachTag.variant}>
                                {eachTag.tag_name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                <Divider variant="middle" style={{ margin: '20px', backgroundColor: 'black' }} />
                <Button
                    onClick={() => {
                        if (isAllCheckBoxesChecked === false) {
                            songs.forEach((song) => {
                                setDisplayedSongs(song.id, true);
                            });
                            setIsAllCheckBoxesChecked(true);
                        } else {
                            setIsAllCheckBoxesChecked(false);
                            songs.forEach((song) => {
                                setDisplayedSongs(song.id, false);
                            });
                        }
                    }}
                    color="primary"
                    style={{ borderRadius: '5px', marginTop: '10px' }}
                    fullWidth={true}
                    size="large"
                    variant={isAllCheckBoxesChecked ? 'contained' : 'outlined'}>
                    {isAllCheckBoxesChecked ? 'Uncheck all' : 'Check all'}
                </Button>
                <Divider variant="middle" style={{ margin: '20px', backgroundColor: 'black' }} />
                {songs
                    .filter((eachSong) => {
                        return eachSong.song_title.toLowerCase().includes(props.searchParams.toLowerCase());
                    })
                    .map((eachSong) => (
                        <List
                            Key={eachSong.id}
                            style={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                margin: '10px',
                                padding: '-10px',
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <ListItem
                                    onClick={() => {
                                        router.push({
                                            pathname: '/song',
                                            query: { id: eachSong.id },
                                        });
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MusicNote />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={eachSong.song_title} />
                                </ListItem>

                                <IconsDropdown songId={eachSong.id} deleteSong={deleteSong} />
                                {/* {eachSong.display ? (
                                    <Checkbox
                                        checked={eachSong.display}
                                        onChange={(e) => {
                                            setDisplayedSongs(eachSong.id, e.target.checked);
                                            console.log(e.target.checked);
                                        }}
                                    />
                                ) : ( */}
                                <Checkbox
                                    checked={eachSong.display}
                                    onChange={(e) => {
                                        if (e.target.checked === false) {
                                            setIsAllCheckBoxesChecked(false);
                                        }
                                        setDisplayedSongs(eachSong.id, e.target.checked);
                                        console.log(e.target.checked);
                                        // if (eachSong.display) {
                                        //     console.log('inside');
                                        //     setDisplayedSongs(eachSong.id, e.target.checked);
                                        // } else {
                                        songTags.map((eachTag) => {
                                            setSongTag((songTag) =>
                                                songTag.map((tag) =>
                                                    tag.tag_name === eachTag.tag_name
                                                        ? { ...tag, variant: 'outlined' }
                                                        : tag,
                                                ),
                                            );
                                        });
                                        // }
                                    }}
                                />
                                {/* )} */}
                            </Box>
                            {eachSong.tags.map((eachTag) => (
                                <Chip
                                    key={eachTag}
                                    label={eachTag}
                                    color="primary"
                                    variant="outlined"
                                    style={{ margin: '5px' }}
                                />
                            ))}
                        </List>
                    ))}
            </>
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
                                    Sign in
                                </Typography>
                            </Box>
                            <TextField
                                fullWidth
                                error={errorEmptyFieldEmail !== ''}
                                helperText={errorEmptyFieldEmail}
                                label="User Name"
                                margin="normal"
                                name="email"
                                type="email"
                                onChange={(evt) => updateEmail(evt)}
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                error={errorEmptyFieldPassword !== ''}
                                helperText={errorEmptyFieldPassword}
                                label="Password"
                                margin="normal"
                                name="password"
                                type="password"
                                onChange={(evt) => updatePassword(evt)}
                                variant="outlined"
                            />
                            <Box sx={{ py: 2 }}>
                                <Button
                                    color="primary"
                                    style={{ borderRadius: '5px' }}
                                    fullWidth
                                    size="large"
                                    onClick={submit}
                                    variant="contained">
                                    Sign In Now
                                </Button>
                            </Box>
                        </form>
                    </Container>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleCloseErrorModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                An error has occurred.
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Wrong user name of password, please try again.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </>
        );
    }
};

export default Login;
