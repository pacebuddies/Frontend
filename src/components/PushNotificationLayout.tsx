import React, { useEffect, ReactNode } from "react";
import * as firebase from "firebase/app";
import  { onMessage, getMessaging } from "firebase/messaging";
import { firebaseCloudMessaging } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSetFCMStore, useFCMStore } from '../store/firebaseStore';
import pacebuddiesApi from '../instances/axiosConfigured';

interface Props {
  children: ReactNode;
}

const PushNotificationLayout: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();

  const setFCMToken = useSetFCMStore((state) => state.setFCMToken);
  const FCMTokenStore = useFCMStore((state) => state.fcm_token);

  useEffect(() => {
    if (FCMTokenStore) {
      pacebuddiesApi
        .put("notification/register", {
          headers: {
           "X-FCM": FCMTokenStore
          }
        }).catch((err) => console.error(err))
    }
  }, [FCMTokenStore])

  useEffect(() => {
    setToken();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

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

  const handleClickPushNotification = (url: string = '') => {
    router.push(url);
  };

  function getMessage() {
    const messaging = getMessaging();
    onMessage(messaging, (message) => {
      toast.success(
        <div>
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
