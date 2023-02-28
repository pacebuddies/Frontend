import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
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
    </>
  );
}

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      success: 'pb-green',
    },
    outline: {
      on: 'bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full',
    },
  },
};

export default MyApp;
