import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import FontFaceObserver from 'fontfaceobserver';
import Router, { useRouter } from 'next/router';
import MainNav from '@/components/MainNav';
import CustomCursor from '@/components/CustomCursor';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (!isSigningOut) {
        setLoading(true);
      }
    };

    const handleRouteChangeComplete = () => {
      if (!isSigningOut) {
        setLoading(false);
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeComplete);

    const loadMaterialIcons = () => {
      return new Promise((resolve) => {
        const materialIconsObserver = new FontFaceObserver('Material Symbols Outlined', { weight: 100 });

        materialIconsObserver.load(null, 10000).then(() => {
          resolve();
          setIsLoaded(true);
        }).catch(() => {
          resolve();
          setIsLoaded(true);
        });
      });
    };

    const onLoad = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      await loadMaterialIcons();
      handleRouteChangeComplete();
    };

    if (router.pathname === '/') {
      onLoad();
    } else {
      setLoading(false);
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.pathname, isSigningOut]);

  return (
    <>
      <Head>
        <title>Kir.ai - Rental Platform</title>
        <link rel="icon" href="/favicons/home.png"/>
      </Head>
      {loading && <Loading />}
      <CustomCursor/>

      <AuthProvider>
        <MainNav />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
