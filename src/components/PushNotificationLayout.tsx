import React, { useEffect, ReactNode } from "react";
import * as firebase from "firebase/app";
import  { onMessage, getMessaging } from "firebase/messaging";
import { firebaseCloudMessaging } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSetFCMStore, useFCMStore } from '../store/firebaseStore';

interface Props {
  children: ReactNode;
}

const PushNotificationLayout: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();

  const setFCMToken = useSetFCMStore((state) => state.setFCMToken);
  const FCMTokenStore = useFCMStore((state) => state.fcm_token);

  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init(setFCMToken, FCMTokenStore);
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url: string = '') => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (message) => {
      console.log("onMessage", message)
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.['url'])}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      {children}
    </>
  );
}

export default PushNotificationLayout;
