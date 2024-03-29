import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StravaWatermark from '../components/StravaWatermark';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title> PaceBuddies </title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <SessionProvider session={session}>
        <Flowbite theme={{ theme }}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <StravaWatermark />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Flowbite>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SessionProvider>
    </>
  );
}

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      success:
        'text-white bg-pb-green border border-transparent hover:bg-pb-green focus:ring-4 focus:ring-green-300 disabled:hover:bg-pb-green',
      strava: 'text-white bg-pb-strava-orange',
    },
    outline: {
      on: 'flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit w-full',
    },
    gradientDuoTone: {
      greenToDarkGreen: 'bg-gradient-to-r from-pb-green to-pb-dark-green text-white hover:bg-gradient-to-bl',
      redToDarkRed: 'bg-gradient-to-r from-pb-red-discard to-pb-dark-red-discard text-white hover:bg-gradient-to-bl',
    },

  },
  carousel: {
    indicators: {
      active: {
        off: 'bg-white/50 hover:bg-white',
        on: 'bg-white ',
      },
      base: 'h-3 w-3 rounded-full',
      wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
    },
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10',
      icon: 'h-5 w-5 text-gray-800 sm:h-6 sm:w-6',
    },
    scrollContainer: {
      base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
      snap: 'snap-x',
    },
  },
};

export default MyApp;
