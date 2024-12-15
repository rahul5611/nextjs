import { useRouter } from 'next/router';
import Head from 'next/head';

import { useEffect } from 'react';
import { AuthProvider } from "./Context/AuthContext";
import Footer from './components/Footer';
import './css/app.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/login');
    }
  }, [router]);

  return <div className="body-container">
    <Head>
      <link rel='icon' href='../favicon.ico' />
      <title>My NextJS Application</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Head>
    <AuthProvider>
      <div style={{ height: "calc(100vh - 53px)", overflowY: "auto" }}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
    <Footer />

  </div>
}
