import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StravaWatermark from '../components/StravaWatermark';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
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
  );
}

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      success:
        'text-white bg-pb-green border border-transparent hover:bg-pb-green focus:ring-4 focus:ring-green-300 disabled:hover:bg-pb-green dark:bg-pb-green dark:hover:bg-pb-green dark:focus:bg-pb-green dark:disabled:hover:bg-pb-green',
    },
    outline: {
      on: 'flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full',
    },
  },
};

export default MyApp;
