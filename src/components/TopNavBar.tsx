import { NextPage } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import stravaApi, { ApiAddress } from '../instances/axiosConfigured';
import avatar from '/src/img/avatar-example.jpg';

const TopNavBar: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  function SynchronizeData() {
    setIsLoading(true);
    stravaApi
      .get('bridge/synchronize')
      .then((res) => {
        setIsLoading(false);
        toast.success('Synchronized successfully');
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error('Synchronize ' + err.message);
        console.log(err);
      });
  }

  return (
    <>
      <nav className="fixed top-0 flex h-[91px] w-full items-center justify-between rounded border-gray-200 bg-pb-gray px-2 py-2.5">
        <div className="flex w-full flex-wrap items-center justify-between">
          {/*Name & Logo*/}
          <div className="ml-3 flex flex-wrap items-center justify-between ">
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-pb-green">
              Pace
            </span>
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-white">
              Buddies
            </span>
          </div>
          {/*Right side icons*/}
          <div className="flex w-auto items-center justify-between">
            {/*Avatar*/}
            <div className="flex items-center">
              <button
                type="button"
                className="mr-3 flex rounded-full border-2 border-solid border-pb-green "
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src={avatar.src}
                  alt="user avatar"
                />
              </button>
            </div>
            {/*Notification*/}
            <div className="flex items-center">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="h-8 w-8 rounded-full hover:animate-wobble"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
            </div>
            {/*Synchronize*/}
            <div className="flex items-center">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                onClick={() => SynchronizeData()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className={
                    'h-8 w-8 rounded-full' + (isLoading ? ' animate-spin' : '')
                  }
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/*Logout*/}
            <div className="flex items-center">
              <form action={ApiAddress + '/logout'} method="POST">
                <button
                  type="submit"
                  className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-8 w-8 rounded-full"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
