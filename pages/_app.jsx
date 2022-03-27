import NavBar from './navbar';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
