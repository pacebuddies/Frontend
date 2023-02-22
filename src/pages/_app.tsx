import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Flowbite theme={{ theme }}>
        <Component {...pageProps} />
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
      success: 'pb-green',
    },
  },
};

export default MyApp;
