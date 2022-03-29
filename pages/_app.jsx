import React, { useState, useEffect } from 'react';
import NavBar from './navbar';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    console.log(pageProps);
    const [searchParams, setsearchParams] = useState('');

    const handleSearch = (newSearch) => {
        console.log(newSearch);
        setsearchParams(newSearch);
    };

    return (
        <>
            <NavBar funcSearch={handleSearch} />
            <Component {...pageProps} searchParams={searchParams} />
            <Button onClick={() => router.back()} variant="contained" startIcon={<ArrowBackIosIcon />}>
                Go Back
            </Button>
        </>
    );
}

export default MyApp;
