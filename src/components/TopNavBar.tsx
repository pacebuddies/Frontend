import { NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi, { stravaOauthApi } from '../instances/axiosConfigured';
import { useAthleteStore } from '../store/athleteStore';

import { ArrowPathIcon, BellIcon, PowerIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { INotification } from '../internalTypes/interfaces';
import { useSetNotificationStore } from '../store/notificationStore';
import NotificationPopup from './Notifications/NotificationPopup';
import SynchronizePopup from './Synchronize/SynchronizePopup';
import logo_circle from "./Images/logo_circle.svg";

const TopNavBar: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [syncPopupOpen, setSyncPopupOpen] = useState(false);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const athlete = useAthleteStore((state) => state.athlete);
  const setNotificationStore = useSetNotificationStore(
    (state) => state.setNotifications,
  );
  const queryClient = useQueryClient();
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
        access_token: `${session?.accessToken}`,
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
    return await signOut({ callbackUrl: '/' });
  }

  function fetchNotifications() {
    return pacebuddiesApi
      .get(`/notification?page=${0}`)
      .then((res) => {
        setNotificationStore(res.data);
        setUnreadNotifications(
          res.data.filter((notification: INotification) => !notification.seen)
            .length,
        );
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <nav className="top-0 flex h-auto w-full items-center justify-between border-gray-200 bg-pb-gray px-2 py-2.5">
        <div className="flex w-full flex-nowrap items-center justify-between">
          {/*Name & Logo*/}
          <Link
            href="/home"
            className="ml-3 flex flex-wrap items-center justify-between "
          >
            <img
              src={logo_circle.src}
              alt="logo_circle"
              className="w-12 h-12"
            />
            <span className=" md:pl-1 pt-2 self-center whitespace-nowrap font-istok-web text-3xl text-pb-green hidden md:block">
              Pace
            </span>
            <span className=" pt-2 self-center whitespace-nowrap font-istok-web text-3xl text-pb-orange hidden md:block">
              Buddies
            </span>
          </Link>
          {/*Right side icons*/}
          <div className="flex w-auto items-center justify-between">
            {/*Avatar*/}
            <div className="flex  items-center">
              <Link href={'/profile'}>
                <button
                  type="button"
                  className="mr-3 flex h-12 w-12  items-center justify-center rounded-full  "
                >
                  <Image
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-solid border-pb-green bg-pb-green"
                    src={athlete?.profile!}
                    alt="user avatar"
                    width={48}
                    height={48}
                    title={athlete?.firstname! + ' ' + athlete?.lastname!}
                    unoptimized={true}
                  />
                </button>
              </Link>
            </div>
            {/*Notification*/}
            <div className="relative">
              {unreadNotifications > 0 && (
                <div className="absolute -top-1 left-9 h-4 w-4 animate-pulse rounded-full bg-pb-orange" />
              )}
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                onClick={() => setNotificationPopupOpen(!notificationPopupOpen)}
              >
                <BellIcon className="h-8 w-8 rounded-full text-white hover:animate-wobble" />
              </button>
                <NotificationPopup
                  show={notificationPopupOpen}
                  onUnreadNotificationsChange={(num: number) => {
                    setUnreadNotifications(num);
                    console.log(num);
                  }}
                />

            </div>
            {/*Synchronize*/}
            <div className="flex flex-col">
              <button
                type="button"
                className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-sm"
                onClick={() => setSyncPopupOpen(!syncPopupOpen)}
              >
                <ArrowPathIcon
                  className={`h-8 w-8 rounded-full text-white ${
                    isLoading ? 'animate-spin' : ''
                  }`}
                />
              </button>
              {syncPopupOpen && (
                <SynchronizePopup synchronize={SynchronizeData} />
              )}
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
