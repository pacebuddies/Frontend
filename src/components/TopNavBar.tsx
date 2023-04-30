import { NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi, { stravaOauthApi } from '../instances/axiosConfigured';
import { useAthleteStore } from '../store/athleteStore';

import { ArrowPathIcon, BellIcon, PowerIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import avatar_placeholder from '../img/avatar_placeholder.png';
import SynchronizePopup from "./Synchronize/SynchronizePopup";

const TopNavBar: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const athlete = useAthleteStore((state) => state.athlete);

  function SynchronizeData() {
    setIsLoading(true);
    pacebuddiesApi
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

  async function Deauthorize() {
    const session = await getSession();
    stravaOauthApi
      .post('/deauthorize', {
        data: {
          access_token: `${session?.accessToken}`,
        },
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
    return await signOut({ callbackUrl: '/' });
  }

  return (
    <>
      <nav className="top-0 flex h-auto w-full items-center justify-between border-gray-200 bg-pb-gray px-2 py-2.5">
        <div className="flex w-full flex-wrap items-center justify-between">
          {/*Name & Logo*/}
          <Link
            href="/home"
            className="ml-3 flex flex-wrap items-center justify-between "
          >
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-pb-green">
              Pace
            </span>
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-white">
              Buddies
            </span>
          </Link>
          {/*Right side icons*/}
          <div className="flex w-auto items-center justify-between">
            {/*Avatar*/}
            <div className="flex  items-center">
              <button
                type="button"
                className="mr-3 flex h-12 w-12  items-center justify-center rounded-full  "
              >
                <Image
                  className="h-12 w-12 shrink-0 rounded-full  border-2 border-solid border-pb-green bg-pb-green"
                  src={athlete?.profile ?? avatar_placeholder.src}
                  alt="user avatar"
                  width={48}
                  height={48}
                  title={athlete?.firstname! + ' ' + athlete?.lastname!}
                  unoptimized={true}
                />
              </button>
            </div>
            {/*Notification*/}
            <div className="flex items-center">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
              >
                <BellIcon className="h-8 w-8 rounded-full text-white hover:animate-wobble" />
              </button>
            </div>
            {/*Synchronize*/}
            <div className="flex flex-col">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                onClick={() => setPopupOpen(!popupOpen)}
              >
                <ArrowPathIcon
                  className={`h-8 w-8 rounded-full text-white ${
                    isLoading ? 'animate-spin' : ''
                  }`}
                />
              </button>
              {popupOpen && <SynchronizePopup synchronize={SynchronizeData} />}
            </div>
            {/*Logout*/}
            <div className="flex items-center">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                onClick={() => Deauthorize()}
              >
                <PowerIcon className="h-8 w-8 rounded-full text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
