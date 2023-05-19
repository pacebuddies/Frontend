import  { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// @ts-ignore
const firebaseCloudMessaging = {
  // @ts-ignore
  init: async (setFCMToken, fcm_token) => {
      const app = initializeApp({
        apiKey: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
        authDomain: process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
        projectId: process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
        storageBucket: process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
        messagingSenderId: process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
        appId: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
        measurementId: process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID']
      });

      try {
        const messaging = getMessaging(app);
        if (fcm_token !== null) {
          return fcm_token;
        }

        // Request the push notification permission from browser
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            getToken(messaging, { vapidKey: process.env['NEXT_PUBLIC_FIREBASE_VAPID_KEY'] }).then((currentToken) => {
                  if (currentToken) {
                    setFCMToken(currentToken)
                    return currentToken;
                  } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    return null;
                  }
                }).catch((err) => {
                  console.log('An error occurred while retrieving token. ', err);
                  return null
                });
          }
        }).catch((err) => console.log(err))
      } catch (error) {
        console.error(error);
        return null;
      }
    // }
  },
};
export { firebaseCloudMessaging };
