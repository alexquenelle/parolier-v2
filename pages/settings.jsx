// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function Settings() {

//     return (
//         <>
//             <>welcome to parolier-V2</>
//         </>
//     );
// }
// import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
// import { useDarkMode } from 'next-dark-mode';
import Router from 'next/router';
// import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import AppleIcon from '@mui/icons-material/Apple';
// import SvgIcon from '@mui/material/SvgIcon';
// import { mdiMusicNoteEighth, mdiRadioFm, mdiSpotify } from '@mdi/js';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cookies from 'universal-cookie';
// import { getClient } from '../utils/ApiClient';

const Login = () => {
    let errorBool = false;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorEmptyFieldEmail, setErrorEmptyFieldEmail] = useState('');
    const [errorEmptyFieldPassword, setErrorEmptyFieldPassword] = useState('');
    const errorString = 'This input field cannot be empty.';
    const cookies = new Cookies();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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

    // const svgSpotify = (
    //     <SvgIcon>
    //         <path d={mdiSpotify} />
    //     </SvgIcon>
    // );

    // const svgLastFM = (
    //     <SvgIcon>
    //         <path d={mdiRadioFm} />
    //     </SvgIcon>
    // );

    // const svgTmpDeezer = (
    //     <SvgIcon>
    //         <path d={mdiMusicNoteEighth} />
    //     </SvgIcon>
    // );

    const submit = () => {
        if (userPassword === '') {
            errorBool = true;
            setErrorEmptyFieldPassword(errorString);
        } else setErrorEmptyFieldPassword('');

        if (userEmail === '') {
            errorBool = true;
            setErrorEmptyFieldEmail(errorString);
        } else setErrorEmptyFieldEmail('');

        console.log(errorBool);

        if (errorBool === false) {
            getClient()
                .authentication.login({
                    email: userEmail,
                    password: userPassword,
                })
                .then((data) => {
                    console.log(data);
                    cookies.set('API_TOKEN', data.token, { path: '/' });
                    Router.push('/');
                })
                // Todo: Handle 401: Token expired
                .catch(handleOpenErrorModal);
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
                                Sign in
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            error={errorEmptyFieldEmail !== ''}
                            helperText={errorEmptyFieldEmail}
                            label="Email Address"
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
                            // onBlur={test}
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
                                // disabled={}
                                fullWidth
                                size="large"
                                onClick={submit}
                                // type="submit"
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
                            Please try again.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Login;
