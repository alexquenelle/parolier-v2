import NavBar from './navbar';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <Button onClick={() => router.back()} variant="contained" startIcon={<ArrowBackIosIcon />}>
                Go Back
            </Button>
        </>
    );
}

export default MyApp;
