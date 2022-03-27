import { CssBaseline } from '@material-ui/core';
import Navbar from './navbar';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
