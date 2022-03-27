import Router from 'next/router';
import NextLink from 'next/link';
import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cookies from 'universal-cookie';

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
            // todo : send data to server
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
                            Please try again.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Login;
