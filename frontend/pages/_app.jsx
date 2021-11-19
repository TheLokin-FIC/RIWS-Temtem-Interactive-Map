import Head from 'next/head';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Temtem Interactive Map</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
